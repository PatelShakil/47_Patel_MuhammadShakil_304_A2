async function getJoke() {
  const res = await fetch("http://localhost:3000/api/joke");
  const data = await res.json();
  document.getElementById("joke").innerText = data.joke;
}
