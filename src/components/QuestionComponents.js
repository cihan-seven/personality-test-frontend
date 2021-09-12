import React from "react";
import axios from "axios";
import { InputGroup } from "react-bootstrap";

const QUESTIONS_ALL_REST_API_URL = "http://localhost:8080/question/all";
const ANSWERS_POST_REST_API_URL = "http://localhost:8080/answer/saveAnswers";

class QuestionComponents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      questions: [],
      selectedOptions: [],
      saveStatus: ''
    };
  }

  componentDidMount() {

    axios.get(QUESTIONS_ALL_REST_API_URL).then((response) => {
      this.setState({ questions: response.data });
      this.setState({ isLoading: false });
    });
    
  }

  sendSelectedOptions = (selectedOptions) => {
    axios.post(ANSWERS_POST_REST_API_URL, selectedOptions)
        .then(response => this.setState({ saveStatus: response.data }));
  }

  render() {
    const { isLoading, questions } = this.state;

    if (isLoading) {
      return <div className="QuestionComponents">Loading </div>;
    }

    return (
      <div className="Questions">
        <h1 className="text-center"> Questions List </h1>
        <table
          style={{
            borderWidth: "1px",
            borderColor: "#aaaaaa",
            borderStyle: "solid",
          }}
        >
          {!this.state.isLoading === "false"
            ? " "
            : questions.map((question) => {
                return (
                  <tr key={question.id}>
                    <td>{question.questionText}<br/> <br/> <br/> <br/> <br/> <br/>  </td>

                    <td>
                      <table
                        style={{
                          borderWidth: "1px",
                          borderColor: "#aaaaaa",
                          borderStyle: "solid",
                        }}
                      >
                        {question.options.map((option) => {
                          return (
                            // TODO
                            <tr key={option.id}>
                              <td>
                                <InputGroup>
                                    {option.text}
                                </InputGroup>
                              </td>
                            </tr>
                          
                          );
                        })}
                      </table>
                    </td>
                  </tr>
                );
              })}
        </table>
      </div>
    );
  }
}

export default QuestionComponents;
