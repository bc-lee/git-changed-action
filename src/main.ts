import * as core from "@actions/core"
import {execSync} from "child_process"

function gitStatus(): string[] {
  return execSync("git status -s", Object({encoding: "utf-8"}))
    .split("\n")
    .slice(0, -1)
}

export function formatErrorOfGitStatus(statusLine: string[]): string {
  let result = ""
  let countChar = 0
  let countLine = 0
  const maxCount = 240
  const minLine = 2
  const maxLine = 10

  for (const line of statusLine) {
    line.trimRight()
    countLine += 1
    countChar += line.length
    if (countChar >= maxCount) {
      if (countLine >= minLine) {
        break
      }
    }
    if (countLine >= maxLine) {
      break
    }

    result += `${line}\n`
  }
  return result
}

async function run(): Promise<void> {
  try {
    const result = gitStatus()
    if (result.length > 1) {
      throw new Error(
        `Found git changed/ignored files. files: \n${formatErrorOfGitStatus(
          result
        )}`
      )
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
