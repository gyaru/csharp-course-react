import { HiOutlineSearchCircle } from "react-icons/hi";
import styled from "styled-components";

const PersonItemBody = styled.div`
  display: grid;
  grid-template-columns: 174px 174px 174px 174px 24px;
  border-bottom: 1px solid #b48ead;
  align-items: center;
  font-family: "Roboto", sans-serif;
  color: #2b303b;
  &:hover {
    color: #b48ead;
  }
`;

const Text = styled.div`
  text-align: center;
  padding: 5px;
`;

const City = styled.div`
  text-align: center;
  padding: 5px;
`;

const Phone = styled.div`
  text-align: center;
  padding: 5px;
`;

const Details = styled.button`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 29px;
  padding: 0px;
  border: none;
  background: none;
  &:hover {
    color: #b48ead;
    background: rgba(180, 142, 173, 0.1);
    border-radius: 15px;
  }
`;

export function PersonItem(props: {
  name: string;
  city: string;
  country: string;
  phone: string;
  id: number;
  showDetails: (id: number, name: string, city: string, country: string, phone: string) => void;
}) {
  return (
    <PersonItemBody>
      <Text>{props.name}</Text>
      <Text>{props.city}</Text>
      <Text>{props.country}</Text>
      <Text>{props.phone}</Text>
      <Details onClick={() => props.showDetails(props.id, props.name, props.city, props.country, props.phone)}>
        <HiOutlineSearchCircle />
      </Details>
    </PersonItemBody>
  );
}
