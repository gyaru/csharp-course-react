import { HiOutlineUser } from "react-icons/hi";
import { IconContext } from "react-icons";
import styled, { css } from "styled-components";

interface IProps {
  isScarySpookyButton?: boolean;
  onClick?: () => void;
}

const PersonDetailsBody = styled.div`
  background: #fff;
  position: absolute;
  bottom: 0;
  height: 300px;
  width: 500px;
  left: 0;
  margin: auto;
  right: 0;
  top: 0;
  border: 3px solid #b48ead;
  border-radius: 15px;
`;

const PersonContent = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
`;

const PersonSide = styled.div`
  display: flex;
`;

const PersonAvatar = styled.div`
  background: #c0c5ce;
  width: 150px;
  height: 150px;
`;

const PersonSignature = styled.div`
  font-family: "Hurricane", cursive;
  font-size: 27px;
  text-align: center;
  color: #000;
`;

const PersonInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 15px;
`;

const PersonInfo = styled.div`
  width: 100%;
  font-family: "Roboto", sans-serif;
  font-size: 16px;
`;

const PersonInfoText = styled.div``;

const PersonInfoButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PersonInfoButton = styled.button<IProps>`
  font-family: "Roboto", sans-serif;
  width: 150px;
  height: 25px;
  background: #b48ead;
  border: none;
  color: #fff;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  &:hover {
    background: #c0c5ce;
    border: 3px solid #c0c5ce;
  }

  ${({ isScarySpookyButton }) =>
    isScarySpookyButton &&
    css`
      background: #bf616a;
    `}
`;

const PersonHeader = styled.div`
  width: 100%;
  text-align: center;
  text-transform: uppercase;
  font-family: "Roboto", sans-serif;
  font-size: 32px;
  padding: 10px 0px 10px 0px;
  color: #b48ead;
  border-bottom: 3px solid #b48ead;
`;

export function PersonDetails(props: {
  name: string;
  city: string;
  country: string;
  phone: string;
  id: number;
  closeDetailsModal: () => void;
  deletePerson: (id: number) => void;
}) {
  return (
    <PersonDetailsBody>
      {/*  replicating an ID card let's go!  */}
      <PersonHeader>identification card</PersonHeader>
      <PersonContent>
        <PersonSide>
          <PersonAvatar>
            <IconContext.Provider value={{ size: "150px", color: "#FFF" }}>
              <HiOutlineUser />
            </IconContext.Provider>
            <PersonSignature>{props.name}</PersonSignature>
          </PersonAvatar>
        </PersonSide>
        <PersonInfoWrapper>
          <PersonInfo>
            <PersonInfoText>ID: {props.id}</PersonInfoText>
            <PersonInfoText>NAME: {props.name}</PersonInfoText>
            <PersonInfoText>CITY: {props.city}</PersonInfoText>
            <PersonInfoText>COUNTRY: {props.country}</PersonInfoText>
            <PersonInfoText>PHONE: {props.phone}</PersonInfoText>
          </PersonInfo>
          <PersonInfoButtonWrapper>
            <PersonInfoButton onClick={() => props.closeDetailsModal()}>
              Close Window
            </PersonInfoButton>
            <PersonInfoButton
              isScarySpookyButton={true}
              onClick={() => {
                props.closeDetailsModal();
                props.deletePerson(props.id);
              }}
            >
              Delete Person
            </PersonInfoButton>
          </PersonInfoButtonWrapper>
        </PersonInfoWrapper>
      </PersonContent>
    </PersonDetailsBody>
  );
}
