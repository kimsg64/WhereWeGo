import React, { useState } from "react";
import styled from "styled-components";
import CustomCalerdar from "../../calendar/CustomCalerdar";
import CheckBoxSet from "../../mixin/CheckBoxSet";
import Form from "../../mixin/Form";
import { Button } from "../../mixin/Mixin";
import { read_cookie } from "sfcookies";
import axios from "axios";
import SelectBox from "../../mixin/SelectBox";

const Container = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`;

const SearchForm = styled(Form)`
  & > div {
    padding: calc(var(--padding-default) * 2);
  }
`;

const Label = styled.label`
  font-size: var(--font-size-normal);
  margin-bottom: var(--margin-default);
`;

const ItemContainer = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: var(--margin-default);
`;

const TitleSection = styled.section`
  width: 300px;
`;

const ContentSection = styled.section`
  width: calc(100% - 300px);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const OptionContainer = styled(ItemContainer)`
  flex-direction: column;
`;

const Indicator = styled.div`
  display: flex;
  padding-right: calc(var(--padding-default) * 2);
`;

const ColorIndicator = styled.div`
  width: 40px;
  height: 20px;
  margin-right: calc(var(--margin-default) / 4);
  background-color: ${(props) => props.bgColor || "inherit"};
`;

const TextIndicator = styled.div`
  font-size: var(--font-size-small);
  margin-right: calc(var(--margin-default) / 4);
`;

const SearchButton = styled(Button)`
  margin-top: var(--margin-default);
`;

const PlanningETC = ({
  selectedDate = null,
  setSelectedDate = () => {},
  selectedStation = "",
  lineNum = "",
}) => {
  const [time, setTime] = useState(10);
  const [sort1, setSort1] = useState("");
  const [sort2, setSort2] = useState("");
  const [sort3, setSort3] = useState("");
  const [opt, setOpt] = useState([]);
  // console.log("ETC 페이지", selectedDate);
  // console.log("ETC", selectedDate);
  // console.log("ETC", selectedStation);

  // 예약 날짜
  const stringifyResdate = () => {
    const dDay = new Date(selectedDate);
    const year = dDay.getFullYear();
    const month = dDay.getMonth() + 1;
    const date = dDay.getDate();
    return `${year}-${month}-${date}`;
  };

  // // 첫 콤보박스 선택시 다음 콤보박스 제한
  // const combination = ["식당", "카페", "기타"];

  const sortNum =
    sort1 + sort2 + sort3 === "식당카페기타"
      ? 1
      : sort1 + sort2 + sort3 === "식당기타카페"
      ? 2
      : sort1 + sort2 + sort3 === "카페식당기타"
      ? 3
      : sort1 + sort2 + sort3 === "카페기타식당"
      ? 4
      : sort1 + sort2 + sort3 === "기타식당카페"
      ? 5
      : 6;

  const onSubmitForm = (e) => {
    e.preventDefault();
    const body = {
      userId: read_cookie("userId"),
      line: lineNum + "호선",
      stname: selectedStation,
      resdate: stringifyResdate(),
      time: parseInt(time),
      datesort: sortNum,
      opt: opt.join("#"),
    };
    console.log(body);

    // 데이터 전송
    axios
      .post("/wherewego/searchCourse", body)
      .then((response) => {
        console.log("response : ", response.data);
        // 데이터 get 해서 결과 창 띄워야 함 ★★★★★
        // 가져갈 데이터
        // 1. userid
        // 2. place1, 2, 3 (이름, 주소, 영업시간, 종류, 전화번호, info, 링크)
        // 3. course(코스명, opt, sort, score, 승인된것만)
        // window.location.href = "http://localhost:3000/#/result";
      })
      .catch((error) => {
        console.log("failed", error);
      });
  };

  return (
    <Container>
      <SearchForm onSubmit={onSubmitForm}>
        <ItemContainer>
          <TitleSection>
            <Label>데이트 날짜를 선택하세요.</Label>
          </TitleSection>
          <ContentSection>
            <Indicator>
              <ColorIndicator bgColor="var(--color-focus)" />
              <TextIndicator>오늘</TextIndicator>
              <ColorIndicator bgColor="var(--color-green)" />
              <TextIndicator>예정</TextIndicator>
            </Indicator>
            <CustomCalerdar
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </ContentSection>
        </ItemContainer>
        <ItemContainer>
          <TitleSection>
            <Label>데이트 시작할 시간을 선택하세요.</Label>
          </TitleSection>
          <ContentSection>
            <Indicator>
              <select onChange={(e) => setTime(e.target.value)}>
                <option value="10">10:00</option>
                <option value="12">12:00</option>
                <option value="14">14:00</option>
                <option value="16">16:00</option>
                <option value="18">18:00</option>
                <option value="20">20:00</option>
              </select>
            </Indicator>
          </ContentSection>
        </ItemContainer>
        <ItemContainer>
          <TitleSection>
            <Label>데이트 순서를 선택하세요.</Label>
          </TitleSection>
          <ContentSection>
            <SelectBox
              sort1={sort1}
              setSort1={setSort1}
              sort2={sort2}
              setSort2={setSort2}
              sort3={sort3}
              setSort3={setSort3}
            />
          </ContentSection>
        </ItemContainer>
        <OptionContainer>
          <Label>관심사를 선택하세요 </Label>
          <CheckBoxSet setOpt={setOpt} />
        </OptionContainer>
        {/* 사실은 axios로 데이터를 받은 뒤 이동해야 함 */}
        <SearchButton type="submit">코스 검색</SearchButton>
      </SearchForm>
    </Container>
  );
};

export default PlanningETC;
