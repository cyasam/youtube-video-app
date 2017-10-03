import axios from 'axios';

export const youtubeApiSearchService = (arg, callback) => {
  return axios({
    method: 'get',
    url: 'https://www.googleapis.com/youtube/v3/search',
    params: {
      part: 'snippet',
      order: 'viewCount',
      q: arg.term,
      type: 'video',
      videoDefinition: 'high',
      key: arg.key
    }
  })
  .then(response => {
    if(response.status === 200) {
      callback(response.data);
    }
  })
  .catch(error => {
    console.log(error);
  });
};

export const youtubeApiVideoService = (arg, callback) => {
  return axios({
    method: 'get',
    url: 'https://www.googleapis.com/youtube/v3/videos',
    params: {
      part: 'id,snippet',
      id: arg.id,
      key: arg.key
    }
  })
  .then(response => {
    if(response.status === 200) {
      callback(response.data);
    }
  })
  .catch(error => {
    console.log(error);
  });
};