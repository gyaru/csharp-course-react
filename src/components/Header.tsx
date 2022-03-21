import styled from "styled-components";

const HeaderComponent = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 3px solid #b48ead;
  width: 100%;
  height: 80px;
  padding-bottom: 3px;
  position: relative;
`;

const HeaderText = styled.h1`
  font-family: "Roboto", sans-serif;
  color: #b48ead;
  font-size: 34px;
  margin: 0;
`;


const SubtitleText = styled.h3`
  font-family: "Roboto", sans-serif;
  color: #b48ead;
  font-size: 15px;
  text-transform: underline;
  margin: 0;
`;

export function Header() {
  return (
    <HeaderComponent>
      <HeaderText>csharp-course-react</HeaderText>
      <SubtitleText>simple react frontend for a .NET backend</SubtitleText>
    </HeaderComponent>
  );
}
