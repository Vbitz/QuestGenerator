/*
   Copyright 2017 Joshua Scarsbrook

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

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

function main(args: string[]): number {
    // tslint:disable-next-line:no-console
    console.log("Hello, World");
    return 0;
}

if (process.mainModule === module) {
    main(process.argv);
}
