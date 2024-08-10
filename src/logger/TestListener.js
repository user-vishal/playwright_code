/* eslint-disable @typescript-eslint/no-unused-vars */
import { Reporter } from "@playwright/test/reporter";
import Logger from "./Logger";

const TEST_SEPARATOR = "##############################################################################";
const STEP_SEPARATOR = "------------------------------------------------------------------------------";

export default class TestListener {
    onTestBegin(test, result) {
        this.printLogs(`Test: ${test.title} - Started`, TEST_SEPARATOR);
    }

    onTestEnd(test, result) {
        if (result.status === 'failed') {
            Logger.error(`Test: ${test.title} - ${result.status}\n${result.error.stack}`);
        }
        this.printLogs(`Test: ${test.title} - ${result.status}`, TEST_SEPARATOR);
    }

    onStdOut(chunk, test, result) {
        Logger.info(chunk);
    }

    onStdErr(chunk, test, result) {
        Logger.error(chunk);
    }

    onStepBegin(test, result, step) {
        if (step.category === "test.step") {
            if (typeof step.parent !== "undefined") {
                Logger.info(step.title);
            } else {
                this.printLogs(`Started Step: ${step.title}`, STEP_SEPARATOR);
            }
        }
    }

    onStepEnd(test, result, step) {
        if (step.category === "test.step" && typeof step.parent === "undefined") {
            this.printLogs(`Completed Step: ${step.title}`, STEP_SEPARATOR);
        }
    }

    onError(error) {
        Logger.error(`Message: ${error.message}`);
        Logger.error(`Stack: ${error.stack}`);
        Logger.error(`Value: ${error.value}`);
    }

    printLogs(msg, separator) {
        Logger.info(separator);
        Logger.info(`${msg.toUpperCase()}`);
        Logger.info(separator);
    }
}
