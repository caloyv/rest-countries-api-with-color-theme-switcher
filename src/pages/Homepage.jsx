import { Suspense, useState } from "react";
import { Await, Link, defer, useLoaderData } from "react-router-dom";
import Countries from "../components/Countries";
import { getApiAll } from "../api";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "@material-tailwind/react";

export function loader() {
  return defer({ countries: getApiAll() });
}

export default function Homepage() {
  const countriesPromise = useLoaderData().countries;

  const [formData, setFormData] = useState({
    searchBar: "",
    filter: "",
  });

  const spinnerStyleDark = {
    color: "rgba(255, 255, 255, .7)",
  };
  const spinnerStyleLight = {
    color: "rgba(0,0,0,.5)",
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }
  function renderCountries(loadedCountries) {
    // Filter
    const displayCountries = formData.filter
      ? loadedCountries.filter((country) => country.region === formData.filter)
      : loadedCountries;
    // console.log(displayCountries)

    const renderElements = displayCountries
      .sort((a, b) => (a.name["common"] > b.name["common"] ? 1 : -1))
      .filter((country) =>
        formData.searchBar.toLowerCase() === ""
          ? country
          : country.name["common"].toLowerCase().includes(formData.searchBar)
      )
      .map((country) => {
        return (
          <div
            className="countries-container mb-5 flex flex-col justify-center items-center "
            key={country.name["common"]}
          >
            <Link
              to={country.cca3}
              className="country-card w-64 shadow-lg rounded-md dark:bg-dark-blue dark:text-light-white "
            >
              <div className="flag-imgst w-full h-40 rounded-t">
                <img
                  src={country.flags["png"]}
                  alt="flag"
                  className="w-full h-full rounded-t-md"
                />
              </div>
              <div className="country-desc p-4 h-full dark:bg-dark-blue dark:text-light-white min-h-[180px] rounded-b-md">
                <p className="country-name pb-3 text-lg font-bold">
                  {country.name["common"]}
                </p>
                <p className="country-population font-semibold text-sm">
                  Population:{" "}
                  <span className="font-normal">
                    {country.population.toLocaleString()}
                  </span>
                </p>
                <p className="country-region font-semibold text-sm">
                  Region: <span className="font-normal">{country.region}</span>
                </p>
                <p className="country-capital font-semibold pb-3 text-sm">
                  Capital:{" "}
                  <span className="font-normal">
                    {country.capital ? country.capital : "None"}
                  </span>
                </p>
              </div>
            </Link>
          </div>
        );
      });

    return renderElements;
  }

  return (
    <main className="bg-light-white dark:bg-very-dark-blue px-3 md:!px-16 lg:flex lg:flex-col lg:justify-center lg:items-center">
      <div className="search-bar w-full h-30 py-12 max-w-[1440px]">
        <div className="sm:flex sm:justify-between sm:items-center relative">
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute top-[20px] left-[30px] dark:text-light-white"
          />
          <input
            name="searchBar"
            type="text"
            placeholder="Seach for a country..."
            className="block p-4 !pl-16 w-full max-w-[500px] mr-2 mb-5 h-14 sm:!m-0 shadow-sm rounded text-sm dark:bg-dark-blue dark:text-light-white focus:bg-transparent"
            value={formData.searchBar}
            onChange={handleChange}
            autoComplete="off"
          />
          <select
            name="filter"
            className="shadow-sm rounded text-sm px-3 block h-14 w-52 dark:bg-dark-blue dark:text-light-white "
            value={formData.filter}
            onChange={handleChange}
          >
            <option value="">Filter by Region</option>
            <option value="Africa">Africa</option>
            <option value="Americas">America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
      </div>
      <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center justify-center max-w-[1440px]">
        <Suspense
          fallback={
            <>
              <div className="loading flex flex-col justify-center items-center col-span-5 ">
                <h1 className=" dark:text-light-white">Loading countries...</h1>
                <div className="spinner-container animate-spin mt-3 flex justify-center w-full ">
                  <Spinner
                    className="h-15 w-15"
                    style={
                      localStorage.getItem("theme") == "dark"
                        ? spinnerStyleDark
                        : spinnerStyleLight
                    }
                  />
                </div>
              </div>
            </>
          }
        >
          <Await resolve={countriesPromise}>{renderCountries}</Await>
        </Suspense>
        <Countries />
      </section>
    </main>
  );
}
