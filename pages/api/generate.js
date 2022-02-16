import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion("text-davinci-001", {
    prompt: generatePrompt(req.body.animal),
    max_tokens: 500,
    temperature: 0.8,
    frequency_penalty: 0.9,
  });
  // console.log(completion.data.choices[0].text.replaceAll('*', '\n'))
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(optionalUserTopic) {
  // const topic = userTopic.toLowerCase();
  console.log(optionalUserTopic)

  if(optionalUserTopic) {
    return `Suggest 5 problems that could be solved${" "+optionalUserTopic}.
    Problems:`
  } else {
    return `Suggest sixteen problems that could be solved${" "+optionalUserTopic}.
  People stealing packages off of porches
  Putting up christmas lights is difficult in the cold
  My plants always die quickly
  It's hard to find new music
  I get bored of doing homework
  Mosquitos are annoying in the summer
  Learning an instrument takes too long
  `;
  }
}
