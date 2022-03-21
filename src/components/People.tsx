import React, { useEffect } from "react";
import styled from "styled-components";
import { PersonItem } from "./Person";
import {
  HiOutlineSortAscending,
  HiOutlineSortDescending,
} from "react-icons/hi";
import { PersonDetails } from "./PersonDetails";
import axios from "axios";
import { API_URL } from "../App";
import { Spinner } from "./Spinner";
import { PersonCreate } from "./PersonCreate";

interface IProps {}

interface City {
  cityId: number;
  cityName: string;
}

interface Country {
  countryId: number;
  countryName: string;
}

interface People {
  id: number;
  name: string;
  city: City;
  country: Country;
  phoneNumber: string;
}

interface IState {
  people?: People[];
  create: boolean;
  ascending: boolean;
  selected?: number | null;
}

const CreatePersonButton = styled.button`
  position: absolute;
  top: -65px;
  left: 15px;
  font-family: "Roboto", sans-serif;
  width: 130px;
  height: 35px;
  background: #a3be8c;
  border: none;
  color: #fff;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  &:hover {
    background: #c0c5ce;
  }
`;

const PeopleListComponent = styled.div`
  position: relative;
`;

const PeopleListHeader = styled.div`
  display: grid;
  grid-template-columns: 174px 174px 174px 174px 24px;
  border-bottom: 3px solid #b48ead;
  padding: 6px 0px 6px 0px;
  font-family: "Roboto", sans-serif;
  color: #b48ead;
`;

const HeaderText = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
`;

export class PeopleList extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      ascending: true,
      create: false
    };
  }

  sortByName(ascending: boolean) {
    if (this.state.people) {
      const sortedPeople: People[] = ascending
        ? [...this.state.people].sort((a, b) => a.name.localeCompare(b.name))
        : [...this.state.people].sort(
            (a, b) => -1 * a.name.localeCompare(b.name)
          );
      ascending
        ? this.setState({ ascending: false })
        : this.setState({ ascending: true });
      this.setState({ people: sortedPeople });
    } else {
      return false;
    }
  }

  showDetails = (id: number) => {
    this.setState({ selected: id });
  };

  closeDetailsModal = () => {
    this.setState({ selected: null });
  };

  toggleCreateModel = () => {
    this.state.create ? this.setState({ create: false }) : this.setState({ create: true });
  }

  deletePerson = async (id: number) => {
    console.log(`deleting: ${id}`);
    try {
      const response = await axios.delete(`${API_URL}/Delete/${id}`);
      console.log(response.data);
      await this.getPeople();
    } catch (error) {
      console.error(error);
    }
  };

  getPeople = async () => {
    try {
      const response = await axios.get(`${API_URL}/All`);
      console.log(response.data);
      this.setState({ people: response.data });
    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount() {
    if (!this.state.people) {
      this.getPeople();
    }
  }

  render() {
    return (
      <>
        <PeopleListComponent>
          <CreatePersonButton onClick={() => this.toggleCreateModel()}>Create Person</CreatePersonButton>
          <PeopleListHeader>
            <HeaderText>
              Name
              {}
              {this.state.ascending ? (
                <HiOutlineSortDescending
                  onClick={() => this.sortByName(this.state.ascending)}
                />
              ) : (
                <HiOutlineSortAscending
                  onClick={() => this.sortByName(this.state.ascending)}
                />
              )}
            </HeaderText>
            <HeaderText>City</HeaderText>
            <HeaderText>Country</HeaderText>
            <HeaderText>Phone</HeaderText>
            <HeaderText></HeaderText>
          </PeopleListHeader>
          {this.state.people ? (
            this.state.people.map((item, i) => (
              <div key={i}>
                <PersonItem
                  id={item.id}
                  name={item.name}
                  city={item.city.cityName}
                  country={item.country.countryName}
                  phone={item.phoneNumber}
                  showDetails={this.showDetails}
                />
              </div>
            ))
          ) : (
            <Spinner />
          )}
        </PeopleListComponent>
        {this.state.selected && this.state.people && (
          <PersonDetails
            id={this.state.selected}
            name={
              this.state.people.find((x) => x.id === this.state.selected)!.name
            }
            city={
              this.state.people.find((x) => x.id === this.state.selected)!.city
                .cityName
            }
            country={
              this.state.people.find((x) => x.id === this.state.selected)!.country
                .countryName
            }
            phone={
              this.state.people.find((x) => x.id === this.state.selected)!
                .phoneNumber
            }
            closeDetailsModal={this.closeDetailsModal}
            deletePerson={this.deletePerson}
          />
        )}
        {this.state.create &&  (
          <PersonCreate toggleCreateModal={this.toggleCreateModel} getPeople={this.getPeople}/>
        )}
      </>
    );
  }
}
