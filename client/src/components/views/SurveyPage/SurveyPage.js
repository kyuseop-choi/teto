import surveyAPI from "api/surveys";
import React, { useEffect, useState } from "react";
import getTime from "utils/getTime";
import LikeInfo from "components/Common/LikeInfo";
import {
  Container,
  CreateButton,
  LoadMoreButton,
  OrderByButtonContainer,
  TestBoard,
  TestLinkItem,
  TestList,
} from "./SurveyPage.styles";
import { ReactComponent as WriteImg } from "assets/write.svg";
import { PALLETE } from "constants/pallete";

function SurveyPage() {
  const [surveyList, setSurveyList] = useState([]);
  const [orderBy, setOrderBy] = useState(0);
  const [loadCount, setLoadCount] = useState(1);
  useEffect(() => {
    surveyAPI
      .getLatestSurveys(loadCount, 8)
      .then((surveys) => setSurveyList(surveyList.concat(surveys)));
  }, []);

  useEffect(() => {
    if (orderBy === 0) {
      surveyAPI
        .getLatestSurveys(loadCount, 8)
        .then((surveys) => setSurveyList(surveyList.concat(surveys)));
    } else if (orderBy === 1) {
      surveyAPI
        .getPopularSurveys(loadCount, 8)
        .then((surveys) => setSurveyList(surveyList.concat(surveys)));
    }
  }, [orderBy, loadCount]);

  const handleOrderByChange = (e) => {
    const nextOrderBy = Number(e.target.value);
    if (nextOrderBy === orderBy) return;
    setSurveyList([]);
    setLoadCount(1);
    setOrderBy(nextOrderBy);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Container>
      <CreateButton to="/survey/create">
        <WriteImg width={24} height={24} fill={PALLETE.WHITE} />
        <span>Create Test</span>
      </CreateButton>
      <TestBoard>
        <OrderByButtonContainer>
          <button
            onClick={handleOrderByChange}
            className={orderBy === 0 ? "selected" : ""}
            value="0"
          >
            latest
          </button>
          <button
            onClick={handleOrderByChange}
            className={orderBy === 1 ? "selected" : ""}
            value="1"
          >
            popular
          </button>
        </OrderByButtonContainer>
        <TestList>
          {surveyList.map((survey) => {
            const d = new Date(Number(survey.createdAt));
            console.log(survey);
            return (
              <TestLinkItem key={survey._id} to={`/survey/${survey._id}`}>
                <div className="survey_title">{survey.title}</div>
                <div className="survey_createdAt">
                  {getTime(survey.createdAt, true)}
                </div>
                <div className="survey_userName">{survey.userName}</div>
                <p className="survey_description">
                  {survey.description && survey.description.length > 50
                    ? survey.description.slice(0, 50) + "..."
                    : survey.description}
                </p>
                <LikeInfo likes={survey.likes} />
              </TestLinkItem>
            );
          })}
        </TestList>

        {surveyList.length > 0 && surveyList.length % 8 === 0 && (
          <LoadMoreButton onClick={() => setLoadCount(loadCount + 1)}>
            load more...
          </LoadMoreButton>
        )}
      </TestBoard>
    </Container>
  );
}

export default SurveyPage;
