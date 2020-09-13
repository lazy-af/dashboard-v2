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