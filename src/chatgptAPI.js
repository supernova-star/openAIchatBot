const BASE_URL = "https://api.openai.com/";

const getOptions = (reqMethod, requestBody = {}) => {
  const options = {
    method: reqMethod,
    headers: {
      Authorization:
        "Bearer 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",
      "Content-Type": "application/json",
    },
    // body: JSON.stringify(requestBody),
  };
  if (reqMethod !== "GET") {
    options.body = JSON.stringify(requestBody);
  }
  return options;
};

export const getChatModels = async () => {
  // https://api.openai.com/v1/models
  const body = getOptions("GET");
  const response = await fetch(`${BASE_URL}v1/models`, body)
    .then(function (res) {
      return res.json();
    })
    .then(function (resJson) {
      return resJson;
    });
  return response.data;
};

// export const getConversations = async () => {
//   const body = getOptions("GET");
//   const response = await fetch(
//     `${BASE_URL}v1/conversations?offset=0&limit=20`,
//     body
//   )
//     .then(function (res) {
//       return res.json();
//     })
//     .then(function (resJson) {
//       return resJson;
//     });
//   console.log("response : ", response);
//   return response.data;
// };

export const getAllCompletions = async (contentMessage, model) => {
  const body = getOptions("POST", {
    model,
    prompt: contentMessage,
    // prompt:
    //   "Marv is a chatbot that reluctantly answers questions with sarcastic responses:\n\nYou: How many pounds are in a kilogram?\nMarv: This again? There are 2.2 pounds in a kilogram. Please make a note of this.\nYou: What does HTML stand for?\nMarv: Was Google too busy? Hypertext Markup Language. The T is for try to ask better questions in the future.\nYou: When did the first airplane fly?\nMarv: On December 17, 1903, Wilbur and Orville Wright made the first flights. I wish they’d come and take me away.\nYou: What is the meaning of life?\nMarv: I’m not sure. I’ll ask my friend Google.\nYou: What time is it?\nMarv:",
    temperature: 0.5,
    max_tokens: 100,
    top_p: 0.3,
    frequency_penalty: 0.5,
    presence_penalty: 0,
  });
  const response = await fetch(`${BASE_URL}v1/completions`, body)
    .then((res) => {
      return res.json();
    })
    .then((resJson) => {
      return resJson;
    });
  // console.log("response : ", response);
  return response.choices[0].text;
};

export const getAllCompletionsForTurboModel = async (contentMessage) => {
  const messages = [{ role: "user", content: contentMessage }];
  // const systemMessage = { role: "system", content: "Speak like a pirate" };
  // const body = getOptions("POST", {
  //   model: "gpt-3.5-turbo",
  //   messages: [systemMessage, ...messages],
  // });
  const body = getOptions("POST", {
    model: "gpt-3.5-turbo",
    messages: messages,
  });
  const response = await fetch(`${BASE_URL}v1/chat/completions`, body)
    .then((res) => {
      return res.json();
    })
    .then((resJson) => {
      return resJson.choices[0].message.content;
    });
  // console.log("response : ", response);
  return response;
};
