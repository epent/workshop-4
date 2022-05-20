class AsyncGame {
  constructor() {
    this.API_BASE = "https://u-workshops.herokuapp.com";
  }

  /* 
        Note: most of these methods will use the `fetch` API
        It's ok if you don't fully understand it yet! You can think of it as a 'blackbox' for now
    */

  async createUser(name) {
    const response = await fetch(`${this.API_BASE}/new_user`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }), // ==> {name: name}
    });
    const userId = await response.json();
    console.log(userId);
  }

  async addToQABank({ question, answer, ownerId }) {
    const response = await fetch(`${this.API_BASE}/new_qa`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ownerId: ownerId,
        question: question,
        answer: answer,
      }),
    });
  }

  async getAllQuestions() {
    // GET request to /all_questions
    // Note! More questions will be added as other students progress in this workshop.
    // Ask around to see who's added new questions!

    const response = await fetch(`${this.API_BASE}/all_questions`);
    const questions = await response.json();
    console.log(questions);
  }

  async answerQuestion({ qaId, answer, userId }) {
    // POST request to /answer_question
    // Note! In the response of this request you'll see whether your answer was correct or not.
    // If you answered incorrectly, try again or bring it up with the user who posted the question!

    console.log(qaId);
    console.log(answer);
    console.log(userId);
    const response = await fetch(`${this.API_BASE}/answer_question`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        qaId: qaId,
        answer: answer,
        userId: userId,
      }),
    });
    const result = await response.json();
    console.log(result);
  }

  async getAnswerSubmissions() {
    // GET request to /answer_submissions

    const response = await fetch(`${this.API_BASE}/answer_submission`);
    const answerSubmissions = await response.json();
    console.log(answerSubmissions);
  }

  async getUsers() {
    // GET request to /the_users

    const response = await fetch(`${this.API_BASE}/the_users`);
    const users = await response.json();
    console.log(users);
  }

  async calculateUserScores() {
    // +1 points for questions you've answered correctly
    // -1 points for questions you've answered incorrectly
    // This is the most "complicated" method - but you've got this ;)
    // Guidelines for this part (ignore if you want an extra challenge!)
    /*
            - Get the users
            - Get the submissions
            - Create an `scores` object
            - Loop through each user ID
                - Extract the username
                - Filter the correct submissions with matching user ID
                - Filter the incorrect submissions with matching user ID
                - Add a new entry to `scores` with the user's name and their score (correct.length - incorrect.length)

            Example of `score` at the end of this: 
            {
                Kayla: 12,
                Darwin: -1
            }
        */
    // const scores = {};
    // const users = await game.getUsers();
    // const answerSubmissions = await game.getAnswerSubmissions();
    // users.forEach((user) => {
    //   answerSubmissions.filter((answerSubmission) => {
    //     return answerSubmission.userId === user;
    //   });
    // });
  }
}

const game = new AsyncGame();
// Remember the server is unexpected, it might return an error!

// Example of running the game:
// game.createUser("Elena");
// 11
// game.addToQABank({
//   question: "Is JavaScript a single-threaded language?",
//   answer: "Yes",
//   ownerId: 16,
// });

// game.getAllQuestions();
// game.answerQuestion({ qaId: 1, answer: 100, userId: 11 });
// game.answerQuestion({ qaId: 5, answer: "Washington DC", userId: 11 });
// game.answerQuestion({ qaId: 13, answer: "London", userId: 11 });

// game.getUsers(); // <-- how can you output the results from here *without* console.log in the method?
// game.getAnswerSubmissions();
// game.calculateUserScores()
