/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const NS = 'org.acme.ttcnetwork';

/**
 * @param {org.acme.ttcnetwork.VisitPlace} data - the trade to be processed
 * @transaction
 */
async function VisitPlace(data) {
    const traveler = data.traveler;
    const place = data.place;
    const company = place.company;

    traveler.money += place.reward;
    company.money -= place.reward;

    const Tregistry = await getParticipantRegistry(NS + '.Traveler');
    await Tregistry.update(traveler);
    
    const Cregistry = await getParticipantRegistry(NS + '.Company');
    await Cregistry.update(company);
}

/**
 * @param {org.acme.ttcnetwork.AddPlace} data - the trade to be processed
 * @transaction
 */
async function AddPlace(data) {
    const place = getFactory().newResource(NS, 'Place', data.placeId);
    place.name = data.name;
    place.reward = data.reward;
    place.company = data.company;

    const Pregistry = await getAssetRegistry(NS + '.Place');
    await Pregistry.add(place);
}

/**
 * @param {org.acme.ttcnetwork.UseMoney} data - the trade to be processed
 * @transaction
 */
async function UseMoney(data) {
    const money = data.money;
    const traveler = data.traveler;

    traveler.money -= money;

    const Tregistry = await getParticipantRegistry(NS + '.Traveler');
    await Tregistry.update(traveler);
}