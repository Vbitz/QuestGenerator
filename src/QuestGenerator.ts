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

// TODO(jscarsbrook): Refactor interfaces and classes into separate files.
// tslint:disable:max-classes-per-file

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

const ID_LENGTH = 4;

/**
 * Generates a random identifier
 * @param type The prefix of the identifier to generate
 * @return A random identifier in the format `{type}_{8 pseudo random bytes}`
 */
function makeIdentifier(type: IdentifierType) {
    return type + "_" + crypto.pseudoRandomBytes(ID_LENGTH).toString("hex");
}

type IdentifierType_Step = "step";
type IdentifierType = IdentifierType_Step;

const ID_STEP_PREFIX: IdentifierType_Step = "step";

/**
 * Basic fields for all step types.
 */
export interface BaseQuestStep {
    /**
     * Should the quest be displayed to players?
     */
    hidden: boolean;

    /**
     * Unique identifier generated with {@link makeIdentifier}
     */
    id: string;
}

/**
 * Structure describing one step
 */
export type QuestStep = BaseQuestStep;

/**
 * Public interface to quest information.
 */
export class QuestInterface {
    constructor(protected generator: QuestGenerator, protected currentStep: QuestStep) { }
}

/**
 * Helper function to create {@link BaseQuestStep}
 */
export function makeBaseStep(): BaseQuestStep {
    return {
        hidden: false,
        id: makeIdentifier(ID_STEP_PREFIX),
    };
}

/**
 * A single world containing a structure of quests.
 */
export class QuestGenerator {
    /**
     * Starts a new quest and returns the definition.
     */
    public startQuest(): QuestInterface {
        return this.getInterface(this.generateQuest());
    }

    /**
     * Generate a single quest step.
     */
    private generateStep(): QuestStep {
        return makeBaseStep();
    }

    /**
     * Generate a full quest line.
     */
    private generateQuest(): QuestStep {
        return this.generateStep();
    }

    /**
     * Creates a public interface for a single QuestStep.
     * @param initialStep The initial step of the quest
     */
    private getInterface(initialStep: QuestStep): QuestInterface {
        return new QuestInterface(this, initialStep);
    }
}

/**
 * Main entry point
 * @param args Command line arguments
 * @return Program exit code
 */
function main(args: string[]): number {
    const generator = new QuestGenerator();

    const questDefinition = generator.startQuest();

    return 0;
}

if (process.mainModule === module) {
    process.exitCode = main(process.argv);
}
