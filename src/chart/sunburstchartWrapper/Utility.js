export const SunBurstUtility = data => {

    const pathArray = [];
    const pathReturn = [];
    data.map(d => {
        pathArray.push(`${d.lineOfBusiness}-${d.phase}-${d.solutionTechnologiesUsed}-${d.capabilities}`);
    })

    pathArray.sort();
        let current = null;
        let cnt = 0;

        for (var i = 0; i < pathArray.length; i++) {
            if (pathArray[i] != current) {
                if (cnt > 0) {
                    pathReturn.push({path: current, ratio: cnt})
                }
                current = pathArray[i];
                cnt = 1;
            } else {
                cnt++;
            }
        }
        if (cnt > 0) {
            pathReturn.push({path: current, ratio: cnt})
        }
        return pathReturn;

    


}