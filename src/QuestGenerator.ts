/**
 * @license
 * ```plain
 * Copyright 2017 Joshua Scarsbrook
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ```
 * @author Joshua Scarsbrook
 * @module QuestGenerator
 * @description
 * A simple Quest Generator
 */

/** */
import * as crypto from "crypto";

// tslint:disable:interface-name

/*
    The basic unit for determining quest difficulty is a swing factor.
    A quest with +10 swing has a large scale positive outcome and a quest
    with -10 swing has a large scale negative outcome. All quests can have
    their effects revoked by a equal or larger response.

    Quests are layed out as a series of steps each representing 1 gameplay
    action. To simplify generation there is only 1 "quest" over the entire
    game world which determines the structure of the world as a whole. This
    main quest can diverge into multiple branching parts.

    To add variability to the quests produced some the player has a limited
    viewpoint on the current quest and all of the factors involved. By
    restricting a player's knowledge of the internal state multiple side
    quests can be made with complex interconnecting elements without this
    nature being immediately apparent.

    The generation is implemented progressively so player steps can influence
    further development. At a low level a grammar is implemented which
    determines the order of elements. The concept of this grammar is based off
    https://dl.acm.org/citation.cfm?id=2000920. This grammar is executed as a
    state machine.
*/

/**
 * Generates a random identifier
 * @param type The prefix of the identifier to generate
 * @return A random identifier in the format `{type}_{8 pseudo random bytes}`
 */
function makeIdentifier(type: string) {
    return type + "_" + crypto.pseudoRandomBytes(4).toString("hex");
}

/**
 * Basic fields for all step types.
 */
export interface BaseQuestStep {
    /**
     * The step directly preceding this step.
     */
    previous: QuestStep | null;

    /**
     * Should the quest be displayed to players?
     */
    hidden: boolean;
}

/**
 * Structure describing one step
 */
export type QuestStep = BaseQuestStep;

/**
 * Structure describing a single quest
 */
export interface Quest {
    /**
     * A list of all steps in a quest.
     * The quest always starts with the first step.
     */
    steps: QuestStep[];
}

/**
 * Helper function to create {@link BaseQuestStep}
 * @param previous The step directly preceding this step.
 * @param hidden Should the quest be displayed to players?
 */
export function makeBaseStep(previous: QuestStep | null, hidden: boolean): BaseQuestStep {
    return { previous, hidden };
}

/**
 * A single world containing a structure of quests.
 */
export class QuestGenerator {
    /**
     * Generate a single quest step.
     */
    public generateStep(): QuestStep {
        return makeBaseStep(null, false);
    }
}

/**
 * Main entry point
 * @param args Command line arguments
 * @return Program exit code
 */
function main(args: string[]): number {
    const generator = new QuestGenerator();

    const currentStep = generator.generateStep();

    return 0;
}

if (process.mainModule === module) {
    process.exitCode = main(process.argv);
}
