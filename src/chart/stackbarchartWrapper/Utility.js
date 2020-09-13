import sdata from './stackVariables';
export const stackBarUtility1 = data => {
    data.map(d => {
        switch (d.capabilities) {
            case "Anlyts":
                switch (d.phase) {
                    case "Development":
                        sdata.anaylitics_D++
                        break;
                    case "Ideation":
                        sdata.anaylitics_I++
                        break;
                    case "Production":
                        sdata.anaylitics_P++
                        break;
                    case "Retired":
                        sdata.anaylitics_R++
                        break;
                    default:
                        console.log('analytics default case');
                        break;
                }
                break;

            case "Adjstmts":
                switch (d.phase) {
                    case "Development":
                        sdata.adjustments_D++
                        break;
                    case "Ideation":
                        sdata.adjustments_I++
                        break;
                    case "Production":
                        sdata.adjustments_P++
                        break;
                    case "Retired":
                        sdata.adjustments_R++
                        break;
                    default:
                        console.log('adjustment default case');
                        break;
                }
                break;

            case "Data En":
                switch (d.phase) {
                    case "Development":
                        sdata.dEnrichment_D++
                        break;
                    case "Ideation":
                        sdata.dEnrichment_I++
                        break;
                    case "Production":
                        sdata.dEnrichment_P++
                        break;
                    case "Retired":
                        sdata.dEnrichment_R++
                        break;
                    default:
                        console.log('data enrichment default case');
                        break;
                }
                break;

            case "Data Ex":
                switch (d.phase) {
                    case "Development":
                        sdata.dExtraction_D++
                        break;
                    case "Ideation":
                        sdata.dExtraction_I++
                        break;
                    case "Production":
                        sdata.dExtraction_P++
                        break;
                    case "Retired":
                        sdata.dExtraction_R++
                        break;
                    default:
                        console.log('data extraction default case');
                        break;
                }
                break;


                case "Data Re":
                    switch (d.phase) {
                        case "Development":
                            sdata.dReporting_D++
                            break;
                        case "Ideation":
                            sdata.dReporting_I++
                            break;
                        case "Production":
                            sdata.dReporting_P++
                            break;
                        case "Retired":
                            sdata.dReporting_R++
                            break;
                        default:
                            console.log('data reporting default case');
                            break;
                    }
                    break;


                case "Data Tr":
                    switch (d.phase) {
                        case "Development":
                            sdata.dTransformation_D++
                            break;
                        case "Ideation":
                            sdata.dTransformation_I++
                            break;
                        case "Production":
                            sdata.dTransformation_P++
                            break;
                        case "Retired":
                            sdata.dTransformation_R++
                            break;
                        default:
                            console.log('data transformation default case');
                            break;
                    }
                    break;

                case "Data Vi":
                    switch (d.phase) {
                        case "Development":
                            sdata.dVisualization_D++
                            break;
                        case "Ideation":
                            sdata.dVisualization_I++
                            break;
                        case "Production":
                            sdata.dVisualization_P++
                            break;
                        case "Retired":
                            sdata.dVisualization_R++
                            break;
                        default:
                            console.log('data visualisation default case');
                            break;
                    }
                    break;

                case "Other":
                    switch (d.phase) {
                        case "Development":
                            sdata.other_D++
                            break;
                        case "Ideation":
                            sdata.other_I++
                            break;
                        case "Production":
                            sdata.other_P++
                            break;
                        case "Retired":
                            sdata.other_R++
                            break;
                        default:
                            console.log('data other default case');
                            break;
                    }
                    break;

                case "Prcs Autmn":
                    switch (d.phase) {
                        case "Development":
                            sdata.pAutomation_D++
                            break;
                        case "Ideation":
                            sdata.pAutomation_I++
                            break;
                        case "Production":
                            sdata.pAutomation_P++
                            break;
                        case "Retired":
                            sdata.pAutomation_R++
                            break;
                        default:
                            console.log('process automation default case');
                            break;
                    }
                    break;

                case "Qlty Vld":
                    switch (d.phase) {
                        case "Development":
                            sdata.qValidation_D++
                            break;
                        case "Ideation":
                            sdata.qValidation_I++
                            break;
                        case "Production":
                            sdata.qValidation_P++
                            break;
                        case "Retired":
                            sdata.qValidation_R++
                            break;
                        default:
                            console.log('process automation default case');
                            break;
                    }
                    break;
                
                
        
            default:
                console.log("should not reach here");
                break;
        }
    })
}


export const stackBarUtility2 = data => {
    return data.map(d => {
        if (d === 'Anlyts') {
            return {
                label: d,
                development: sdata.anaylitics_D,
                ideation: sdata.anaylitics_I,
                production: sdata.anaylitics_P,
                retired: sdata.anaylitics_R,
                total: sdata.anaylitics_D + sdata.anaylitics_I + sdata.anaylitics_P + sdata.anaylitics_R
            }
        }

        if (d === 'Adjstmts') {
            return {
                label: d,
                development: sdata.adjustments_D,
                ideation: sdata.adjustments_I,
                production: sdata.adjustments_P,
                retired: sdata.adjustments_R,
                total: sdata.adjustments_D + sdata.adjustments_I + sdata.adjustments_P + sdata.adjustments_R
            }
        }

        if (d === 'Data En') {
            return {
                label: d,
                development: sdata.dEnrichment_D,
                ideation: sdata.dEnrichment_I,
                production: sdata.dEnrichment_P,
                retired: sdata.dEnrichment_R,
                total: sdata.dEnrichment_D + sdata.dEnrichment_I + sdata.dEnrichment_P + sdata.dEnrichment_R
            }
        }

        if (d === 'Data Ex') {
            return {
                label: d,
                development: sdata.dExtraction_D,
                ideation: sdata.dExtraction_I,
                production: sdata.dExtraction_P,
                retired: sdata.dExtraction_R,
                total: sdata.dExtraction_D + sdata.dExtraction_I + sdata.dExtraction_P + sdata.dExtraction_R
            }
        }

        if (d === 'Data Re') {
            return {
                label: d,
                development: sdata.dReporting_D,
                ideation: sdata.dReporting_I,
                production: sdata.dReporting_P,
                retired: sdata.dReporting_R,
                total: sdata.dReporting_D + sdata.dReporting_I + sdata.dReporting_P + sdata.dReporting_R
            }
        }

        if (d === 'Data Tr') {
            return {
                label: d,
                development: sdata.dTransformation_D,
                ideation: sdata.dTransformation_I,
                production: sdata.dTransformation_P,
                retired: sdata.dTransformation_R,
                total: sdata.dTransformation_D + sdata.dTransformation_I + sdata.dTransformation_P + sdata.dTransformation_R
            }
        }

        if (d === 'Data Vi') {
            return {
                label: d,
                development: sdata.dVisualization_D,
                ideation: sdata.dVisualization_I,
                production: sdata.dVisualization_P,
                retired: sdata.dVisualization_R,
                total: sdata.dVisualization_D + sdata.dVisualization_I + sdata.dVisualization_P + sdata.dVisualization_R
            }
        }

        if (d === 'Other') {
            return {
                label: d,
                development: sdata.other_D,
                ideation: sdata.other_I,
                production: sdata.other_P,
                retired: sdata.other_R,
                total: sdata.other_D + sdata.other_I + sdata.other_P + sdata.other_R
            }
        }

        if (d === 'Prcs Autmn') {
            return {
                label: d,
                development: sdata.pAutomation_D,
                ideation: sdata.pAutomation_I,
                production: sdata.pAutomation_P,
                retired: sdata.pAutomation_R,
                total: sdata.pAutomation_D + sdata.pAutomation_I + sdata.pAutomation_P + sdata.pAutomation_R
            }
        }

        if (d === 'Qlty Vld') {
            return {
                label: d,
                development: sdata.qValidation_D,
                ideation: sdata.qValidation_I,
                production: sdata.qValidation_P,
                retired: sdata.qValidation_R,
                total: sdata.qValidation_D + sdata.qValidation_I + sdata.qValidation_P + sdata.qValidation_R
            }
        }
        
    })
}


export const KPIUtility = (data, phase) => {
    let development = 0;
            let ideation = 0;
            let production = 0;
            let retired = 0;
            data.map((d) => {
                if (d.phase === "Development") {
                    development++;
                } else if (d.phase === "Ideation") {
                    ideation++;
                } else if (d.phase === "Production") {
                    production++;
                } else if (d.phase === "Retired") {
                    retired++;
                } else {
                    return null;
                }
            });
            if (phase === 'development') {
                return {phase: "Development", count: development}
            } else if (phase === 'ideation') {
                return {phase: "Ideation", count: ideation}
            } else if (phase === 'production') {
                return {phase: "Production", count: production}
            } else if (phase === "retired") {
                return {phase: "Retired", count: retired}
            } else {
                return null;
            }
}


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