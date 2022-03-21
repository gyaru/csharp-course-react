import { HiOutlineUser } from "react-icons/hi";
import React, { FormEventHandler, useEffect } from "react";
import { IconContext } from "react-icons";
import styled, { css } from "styled-components";
import axios from "axios";
import { API_URL } from "../App";
import { Spinner } from "./Spinner";


interface IProps {
  toggleCreateModal: () => void;
  getPeople: () => void;
}

interface Cities {
  map(arg0: (item: any, i: any) => JSX.Element): React.ReactNode;
  cityId: number;
  cityName: string;
}


interface Countries {
  map(arg0: (item: any, i: any) => JSX.Element): React.ReactNode;
  countryId: number;
  countryName: string;
}

interface IState {
  Name: string;
  CurrentCityId: string;
  CurrentCountryId: string;
  PhoneNumber: string;
  cities: Cities[];
  countries: Countries[];
  status: boolean;
}

const CloseWindow = styled.button`
  font-family: "Roboto", sans-serif;
  width: 150px;
  height: 25px;
  background: #b48ead;
  border: none;
  margin-left: 15px;
  color: #fff;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  &:hover {
    background: #c0c5ce;
    border: 3px solid #c0c5ce;
  }
`;

const Submit = styled.button`
  font-family: "Roboto", sans-serif;
  width: 130px;
  height: 35px;
  margin-left: 15px;
  background: #a3be8c;
  border: none;
  color: #fff;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  &:hover {
    background: #c0c5ce;
  }
`;

const Label = styled.label`
  color: #b48ead;
  font-family: "Roboto", sans-serif;
  font-size: 17px;
  padding: 15px;
`;

const Input = styled.input`
  color: #b48ead;
  font-family: "Roboto", sans-serif;
  font-size: 17px;
  padding: 5px;
  margin: 10px;
  border: solid 2px #2b303b;
  border-radius: 3px;
  ::placeholder {
    color: #b48ead61;
  }
`;

const PersonCreateModal = styled.div`
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

const Select = styled.select`
  color: #b48ead;
  font-family: "Roboto", sans-serif;
  font-size: 17px;
  padding: 5px;
  margin: 10px;
  border: solid 2px #2b303b;
  border-radius: 3px;
`;

export class PersonCreate extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  createPerson = async (
    name: string,
    currentCityId: string,
    currentCountryId: string,
    phoneNumber: string
  ) => {
    var bodyFormData = new FormData();
    bodyFormData.append("Name", name);
    bodyFormData.append("CurrentCityId", currentCityId);
    bodyFormData.append("CurrentCountryId", currentCountryId);
    bodyFormData.append("PhoneNumber", phoneNumber);
    try {
      const response = await axios({
        method: "post",
        url: `${API_URL}/Create`,
        data: bodyFormData,
      });
      if (response.status === 200) {
        this.props.toggleCreateModal();
        this.props.getPeople();
      }
    } catch (error) {
      console.error(error);
    }
  };

  getCities = async () => {
    try {
      const response = await axios.get(`${API_URL}/Cities`);
      this.setState({ cities: response.data });
    } catch (error) {
      console.error(error);
    }
  };

  getCountries = async () => {
    try {
      const response = await axios.get(`${API_URL}/Countries`);
      this.setState({ countries: response.data });
    } catch (error) {
      console.error(error);
    }
  };

  handleChange(e: React.ChangeEvent<HTMLFormElement>) {
    if (e.target.name === "Name") {
      this.setState({ Name: e.target.value });
    }
    if (e.target.name === "PhoneNumber") {
      this.setState({ PhoneNumber: e.target.value });
    }
    if (e.target.name === "CurrentCityId") {
      this.setState({ CurrentCityId: e.target.value });
    }
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    this.createPerson(
      this.state.Name,
      this.state.CurrentCityId,
      this.state.CurrentCountryId,
      this.state.PhoneNumber
    );
    e.preventDefault();
  }

  componentDidMount() {
    this.setState({status: false})
    if (!this.state) {
      this.getCities();
      this.getCountries();
    }
  }

  render() {
    return (
      <PersonCreateModal>
        {this.state && this.state.cities && this.state.countries ? (
          <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
            <Label>
              Name:
              <Input type="text" name="Name" placeholder="Steve Wozniak" />
            </Label>
            <br />
            <Label>
              PhoneNumber:
              <Input type="text" name="PhoneNumber" placeholder="0302-1337" />
            </Label>
            <br />
            <Label>
              City:
              <Select name="CurrentCityId" id="CurrentCityId" defaultValue={this.state.cities[0].cityId}>
                {this.state.cities.map((item, i) => (
                  <option key={i} value={item.cityId}>
                    {item.cityName}
                  </option>
                ))}
              </Select>
            </Label>
            <br />
            <Label>
              Country:
              <Select name="CurrentCountryId" id="CurrentCountryId" defaultValue={this.state.countries[0].countryId}>
                {this.state.countries.map((item, i) => (
                  <option key={i} value={item.countryId}>
                    {item.countryName}
                  </option>
                ))}
              </Select>
            </Label>
            <br />
            {this.state && this.state.Name && this.state.PhoneNumber && (
              <Submit type="submit" value="Submit">Create</Submit>
            )}
          </form>
        ) : (
          <Spinner />
        )}
        <CloseWindow onClick={() => this.props.toggleCreateModal()}>
              Close Window
          </CloseWindow>
      </PersonCreateModal>
    );
  }
}
