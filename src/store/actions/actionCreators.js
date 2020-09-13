import Axios from "axios";
import { json } from "d3";

export const phaseApi = (params) => {
    return dispatch => {
        console.log("ddd", params);
        Axios.get(`url+ with ${params}`).then(data => {
            dispatch({type: 'phase', data: data})
        }).catch(err => {
            console.log("ERROR:", err);
            json("dummydata.json").then(data => {
                let updatedDataSet = [];
                params.map(phase => {
                    if (phase === 'development') {
                        updatedDataSet = [...updatedDataSet, ...data.filter(d => d.phase === 'Development')]
                    }
                    if (phase === 'ideation') {
                        updatedDataSet = [...updatedDataSet, ...data.filter(d => d.phase === 'Ideation')]
                    }
                    if (phase === 'production') {
                        updatedDataSet = [...updatedDataSet, ...data.filter(d => d.phase === 'Production')]
                    }
                    if (phase === 'retired') {
                        updatedDataSet = [...updatedDataSet, ...data.filter(d => d.phase === 'Retired')]
                    }
                })
                dispatch({type: "phase", params: params, data: updatedDataSet})
            })
        })
    }
}

export const lobApi = params => {
    return dispatch => {
        console.log("lob", params);
        Axios.get(`url with ${params}`).then(data => {
            dispatch({type: 'lob', data: data})
        }).catch(err => {
            console.log("ERRORRR:", err);
            json('dummydata.json').then(data => {
                let updatedDataSet = [];
                params.map(lob => {
                    if (lob === 'awm') {
                        updatedDataSet = [...updatedDataSet, ...data.filter(d => d.lineOfBusiness === 'AWM')]
                    }
                    if (lob === 'ccb') {
                        updatedDataSet = [...updatedDataSet, ...data.filter(d => d.lineOfBusiness === 'CCB')]
                    }
                    if (lob === 'cib') {
                        updatedDataSet = [...updatedDataSet, ...data.filter(d => d.lineOfBusiness === 'CIB')]
                    }
                    if (lob === 'ct') {
                        updatedDataSet = [...updatedDataSet, ...data.filter(d => d.lineOfBusiness === 'CT')]
                    }
                })
                dispatch({type: "lob", params: params, data: updatedDataSet})
            })
        })
    }
}

export const capApi = params => {
    return dispatch => {
        console.log("cap", params);
        Axios.get(`url with ${params}`).then(data => {
            dispatch({type: 'cap', data: data})
        }).catch(err => {
            console.log("ERRORRR:", err);
            json('dummydata.json').then(data => {
                let updatedDataSet = [];
                params.map(cap => {
                    if (cap === 'anlyts') {
                        updatedDataSet = [...updatedDataSet, ...data.filter(d => d.capabilities === 'Anlyts')]
                    }
                    if (cap === 'adjstmts') {
                        updatedDataSet = [...updatedDataSet, ...data.filter(d => d.capabilities === 'Adjstmts')]
                    }
                    if (cap === 'qltyvld') {
                        updatedDataSet = [...updatedDataSet, ...data.filter(d => d.capabilities === 'Qlty Vld')]
                    }
                    if (cap === 'dataex') {
                        updatedDataSet = [...updatedDataSet, ...data.filter(d => d.capabilities === 'Data Ex')]
                    }
                    if (cap === 'dataen') {
                        updatedDataSet = [...updatedDataSet, ...data.filter(d => d.capabilities === 'Data En')]
                    }
                    if (cap === 'datatr') {
                        updatedDataSet = [...updatedDataSet, ...data.filter(d => d.capabilities === 'Data Tr')]
                    }
                    if (cap === 'datavi') {
                        updatedDataSet = [...updatedDataSet, ...data.filter(d => d.capabilities === 'Data Vi')]
                    }
                    if (cap === 'datare') {
                        updatedDataSet = [...updatedDataSet, ...data.filter(d => d.capabilities === 'Data Re')]
                    }
                    if (cap === 'prcsautmn') {
                        updatedDataSet = [...updatedDataSet, ...data.filter(d => d.capabilities === 'Prcs Autmn')]
                    }
                    if (cap === 'other') {
                        updatedDataSet = [...updatedDataSet, ...data.filter(d => d.capabilities === 'Other')]
                    }
                })
                dispatch({type: "cap", params: params, data: updatedDataSet})
            })
        })
    }
}


export const stuApi = params => {
    return dispatch => {
        console.log("stu", params);
        Axios.get(`url with ${params}`).then(data => {
            dispatch({type: 'stu', data: data})
        }).catch(err => {
            console.log("ERRORRR:", err);
            json('dummydata.json').then(data => {
                let updatedDataSet = [];
                params.map(stu => {
                    if (stu === 'tableau') {
                        updatedDataSet = [...updatedDataSet, ...data.filter(d => d.solutionTechnologiesUsed === 'Tableau')]
                    }
                    if (stu === 'winAutomation') {
                        updatedDataSet = [...updatedDataSet, ...data.filter(d => d.solutionTechnologiesUsed === 'WinAutomation')]
                    }
                    if (stu === 'qlikview') {
                        updatedDataSet = [...updatedDataSet, ...data.filter(d => d.solutionTechnologiesUsed === 'QlikView')]
                    }
                    if (stu === 'automationanywhere') {
                        updatedDataSet = [...updatedDataSet, ...data.filter(d => d.solutionTechnologiesUsed === 'AutomationAnywhere')]
                    }
                    if (stu === 'alteryx') {
                        updatedDataSet = [...updatedDataSet, ...data.filter(d => d.solutionTechnologiesUsed === 'Alteryx')]
                    }
                    if (stu === 'cognos') {
                        updatedDataSet = [...updatedDataSet, ...data.filter(d => d.solutionTechnologiesUsed === 'Cognos')]
                    }
                    if (stu === 'reportbuilder') {
                        updatedDataSet = [...updatedDataSet, ...data.filter(d => d.solutionTechnologiesUsed === 'ReportBuilder')]
                    }
                })
                dispatch({type: "stu", params: params, data: updatedDataSet})
            })
        })
    }
}