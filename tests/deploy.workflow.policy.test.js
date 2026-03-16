import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { parseDocument } from "yaml";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DEPLOY_WORKFLOW_PATH = path.join(__dirname, "..", ".github", "workflows", "deploy.yml");
const DEPLOY_WORKFLOW = fs.readFileSync(DEPLOY_WORKFLOW_PATH, "utf8");
const DEPLOY_WORKFLOW_DOC = parseDocument(DEPLOY_WORKFLOW);
const DEPLOY_WORKFLOW_CONFIG = DEPLOY_WORKFLOW_DOC.toJSON();

function getOnConfig(workflow) {
  return workflow.on || workflow.true || workflow["on"] || workflow["true"];
}

function canDeployForEvent(workflow, event) {
  const onConfig = getOnConfig(workflow);
  const workflowRun = onConfig?.workflow_run;
  const deployJob = workflow.jobs?.deploy;

  if (!workflowRun || !deployJob) return false;
  if (event.eventName !== "workflow_run") return false;
  if (!workflowRun.workflows?.includes(event.workflowName)) return false;
  if (!workflowRun.types?.includes(event.workflowRunType)) return false;
  if (!workflowRun.branches?.includes(event.headBranch)) return false;

  const expectedIf = "${{ github.event.workflow_run.conclusion == 'success' }}";
  if (deployJob.if !== expectedIf) return false;
  return event.workflowRunConclusion === "success";
}

describe("deploy workflow policy", () => {
  it("is triggered only by Run Tests workflow completion on main", () => {
    const onConfig = getOnConfig(DEPLOY_WORKFLOW_CONFIG);
    expect(onConfig.workflow_run.workflows).toEqual(["Run Tests"]);
    expect(onConfig.workflow_run.types).toEqual(["completed"]);
    expect(onConfig.workflow_run.branches).toEqual(["main"]);
    expect(onConfig.workflow_dispatch).toBeUndefined();
  });

  it("deploys only successful tested SHA from workflow_run event", () => {
    const deployJob = DEPLOY_WORKFLOW_CONFIG.jobs.deploy;
    expect(deployJob.if).toBe("${{ github.event.workflow_run.conclusion == 'success' }}");
    expect(deployJob.env.DEPLOY_SHA).toBe("${{ github.event.workflow_run.head_sha }}");

    const checkoutStep = deployJob.steps.find((step) => step.uses === "actions/checkout@v4");
    expect(checkoutStep?.with?.ref).toBe("${{ github.event.workflow_run.head_sha }}");
  });

  it("simulates deploy gate decisions from workflow events", () => {
    expect(
      canDeployForEvent(DEPLOY_WORKFLOW_CONFIG, {
        eventName: "workflow_run",
        workflowName: "Run Tests",
        workflowRunType: "completed",
        headBranch: "main",
        workflowRunConclusion: "success",
      })
    ).toBe(true);

    expect(
      canDeployForEvent(DEPLOY_WORKFLOW_CONFIG, {
        eventName: "workflow_run",
        workflowName: "Run Tests",
        workflowRunType: "completed",
        headBranch: "main",
        workflowRunConclusion: "failure",
      })
    ).toBe(false);

    expect(
      canDeployForEvent(DEPLOY_WORKFLOW_CONFIG, {
        eventName: "workflow_dispatch",
        workflowName: "Run Tests",
        workflowRunType: "completed",
        headBranch: "main",
        workflowRunConclusion: "success",
      })
    ).toBe(false);
  });
});
