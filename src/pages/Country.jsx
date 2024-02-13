import { defer, useLoaderData, Await, Link, useParams } from "react-router-dom";

import { Suspense, useEffect, useState } from "react";

import { FaArrowLeftLong } from "react-icons/fa6";

import { getCountryCode } from "../api";
import { Spinner } from "@material-tailwind/react";

export function loader({ params }) {
  return defer({
    country: getCountryCode(params.country),
  });
}

const Country = () => {
  const countryPromise = useLoaderData().country;
  const [borderCountries, setBorderCountries] = useState();
  const [loadingBorderCountries, setLoadingBorderCountries] = useState(true);

  const spinnerStyleDark = {
    color: "rgba(255, 255, 255, .7)",
  };
  const spinnerStyleLight = {
    color: "rgba(0,0,0,.5)",
  };

  useEffect(() => {
    async function getCountry() {
      try {
        const data = await countryPromise;
        const borderArr = data[0].borders.map((border) => border);
        const bordersPromise = await borderArr.map((border) =>
          getCountryCode(border)
        );
        const borders = await Promise.all(bordersPromise);
        setBorderCountries(borders);
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingBorderCountries(false);
      }
    }
    getCountry();
  }, [useParams().country]);

  function renderCountryElements(country) {
    // console.log(borderCountries instanceof Array);
    // console.log(country)
    const currency = country[0].currencies
      ? Object.values(country[0].currencies)
      : "N/A";
    const languages = country[0].languages
      ? Object.values(country[0].languages).join(", ")
      : "N/A";

    return (
      <section className="h-full lg:flex lg:gap-24 lg:items-center lg:justify-center lg:flex-wrap">
        <div className="flex flex-col justify-center items-center md:w-[100%] lg:w-[35%]">
          <img
            className="w-full max-w-[350px] max-h-[250px] md:max-w-[450px] lg:max-w-none lg:max-h-[350px] lg:min-w-[500px]"
            src={country[0].flags["png"]}
            alt=""
          />
        </div>
        <div className="dark:text-light-white">
          <h1 className="mt-10 mb-4 font-extrabold text-xl lg:text-2xl lg:mt-0">
            {country[0].name["common"]}
          </h1>
          <div className="flag-desc flex flex-col gap-5 lg:flex-row lg:!gap-20 lg:min-w-full lg:max-w-[700px]">
            <div className="section-one flex flex-col gap-2 text-sm font-bold">
              <p className="">
                Native Name:{" "}
                <span className="font-normal">
                  {country[0].altSpellings[1] || "N/A"}
                </span>
              </p>
              <p>
                Population:{" "}
                <span className="font-normal">
                  {country[0].population.toLocaleString()}
                </span>
              </p>
              <p>
                Region: <span className="font-normal">{country[0].region}</span>
              </p>
              <p>
                Sub Region:{" "}
                <span className="font-normal">
                  {country[0].subregion || "N/A"}
                </span>
              </p>
              <p>
                Capital:{" "}
                <span className="font-normal">
                  {country[0].capital ? country[0].capital[0] : "N/A"}
                </span>
              </p>
            </div>
            <div className="section-two text-sm font-bold flex flex-col gap-2">
              <p>
                Top Level Domain:{" "}
                <span className="font-normal">{country[0].tld[0]}</span>
              </p>
              <p>
                Currencies:{" "}
                <span className="font-normal">
                  {currency[0].name || currency}
                </span>
              </p>
              <p>
                Languages: <span className="font-normal">{languages}</span>
              </p>
            </div>
          </div>
          <div className="lg:flex lg:justify-center lg:items-center lg:mt-8">
            <h2 className="my-4 lg:!my-0 lg:w-48 font-bold">Border Countries: </h2>
            <div className="border-countries flex gap-2 flex-wrap pb-4 lg:!pb-0 lg:w-[510px]">
              {loadingBorderCountries ? (
                <span>
                  <Spinner
                    className="h-15 w-15"
                    style={
                      localStorage.getItem("theme") == "dark"
                        ? spinnerStyleDark
                        : spinnerStyleLight
                    }
                  />
                </span>
              ) : borderCountries && borderCountries.length > 0 ? (
                borderCountries.map((border, index) => (
                  <Link
                    key={index}
                    to={`/${border[0].cca3}`}
                    className="dark:bg-dark-blue dark:text-light-white px-4 py-1 button-shadow rounded-sm"
                  >
                    {border[0].name.common}
                  </Link>
                ))
              ) : (
                <span>None</span>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <main className="bg-light-white dark:bg-very-dark-blue px-4 pt-5 sm:!px-12 md:!px-14 lg:!px-16">
      <div className="button-shadow w-24 rounded-sm">
        <Link
          to="/rest-countries-api-with-color-theme-switcher"
          className="flex justify-center items-center gap-3  dark:bg-dark-blue dark:text-light-white py-1  mb-14 font-medium text-sm rounded"
          relative="path"
          preventScrollReset={true}
        >
          <FaArrowLeftLong />
          Back
        </Link>
      </div>

      <Suspense
        fallback={
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
        }
      >
        <Await resolve={countryPromise}>{renderCountryElements}</Await>
      </Suspense>
    </main>
  );
};

export default Country;
