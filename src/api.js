export async function getApiAll() {
  const url = "https://restcountries.com/v3.1/all";
  const res = await fetch(url);
  if (!res.ok) {
    throw {
      message: "Failed to fetch countries",
      statusText: res.statusText,
      status: res.status,
    };
  }
  const data = await res.json();
  return data;
}


export async function getCountryCode(code) {
  const url = `https://restcountries.com/v3.1/alpha/${code}`
  const res = await fetch(url);
  if (!res.ok) {
    throw {
      message: "Failed to fetch countries",
      statusText: res.statusText,
      status: res.status,
    };
  }
  const data = await res.json();
  return data;
}