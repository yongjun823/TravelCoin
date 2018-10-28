const NS = 'org.acme.ttcnetwork';

/**
 * @param {org.acme.ttcnetwork.VisitPlace} data 
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
 * @param {org.acme.ttcnetwork.AddPlace} data 
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
 * @param {org.acme.ttcnetwork.UseMoney} data 
 * @transaction
 */
async function UseMoney(data) {
    const money = data.money;
    const traveler = data.traveler;

    traveler.money -= money;

    const Tregistry = await getParticipantRegistry(NS + '.Traveler');
    await Tregistry.update(traveler);
}