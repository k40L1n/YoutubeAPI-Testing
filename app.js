let API_KEY = "AIzaSyDnpJeld9MYfsfFYnf7J9rhe0mfBZKsnDY";
let playlistId = "UUBvc7pmUp9wiZIFOXEp1sCg";
let maxres = 8;
let url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&part=snippet&playlistId=${playlistId}&maxResults=${maxres}`;

let youtubeInfo = document.querySelector(".youtubeInfo");

async function apiCall() {
  let result = await fetch(url);
  let data = await result.json();
  let video = data.items;
  console.log(video);

  video = video.map((item) => {
    const title = item.snippet.title;
    const videoID = item.snippet.resourceId.videoId;
    const thumbnail = item.snippet.thumbnails.maxres.url;
    return { title, videoID, thumbnail };
  });

  // console.log(video);
  let finalOutput = video
    .map(
      (item) => `   
      <div class="col-md-3">    
       <a href="https://www.youtube.com/watch?v=${item.videoID}" class="text-decoration-none">   
          <img class="img-fluid" src="${item.thumbnail}" />
          <h5 class="text-dark">${item.title}</h5>
        </a> 
      </div>   
  `
    )
    .join(" ");
  youtubeInfo.innerHTML = finalOutput;
}

apiCall();
