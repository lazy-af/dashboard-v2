export const pieUtility = (data) => {
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
    return [
          { label: "Development", value: development },
          { label: "Ideation", value: ideation },
          { label: "Production", value: production },
          { label: "Retired", value: retired },
        ];
}