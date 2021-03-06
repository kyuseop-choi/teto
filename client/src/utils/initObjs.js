export const initType = () => {
  return { id: "t" + Date.now().toString(), name: "", description: "" };
};

export const initQuestion = (types) => {
  return {
    id: "q" + Date.now().toString(),
    text: "",
    description: "",
    options: [initOption(types)],
  };
};

export const initOption = (types) => {
  return {
    id: "o" + Date.now().toString(),
    text: "",
    forType: types[0].id,
    weight: 1,
  };
};

/* Bingo Objs */
export const initLevel = (biggestMinLines) => {
  return {
    id: "l" + Date.now().toString(),
    name: "",
    description: "",
    minLines: biggestMinLines + 1,
  };
};
