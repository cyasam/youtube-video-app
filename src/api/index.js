import axios from 'axios';

export const YTApiSearchService = (arg, callback) => {
  return axios({
    method: 'get',
    url: 'https://www.googleapis.com/youtube/v3/search',
    params: {
      part: 'snippet',
      order: arg.order,
      q: arg.term,
      maxResults: arg.maxResults,
      type: 'video',
      videoDefinition: 'high',
      pageToken: arg.pageToken,
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

export const YTApiVideoService = (arg, callback) => {
  return axios({
    method: 'get',
    url: 'https://www.googleapis.com/youtube/v3/videos',
    params: {
      part: 'id,snippet,statistics',
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

export const YTApiChannelService = (arg, callback) => {
  return axios({
    method: 'get',
    url: 'https://www.googleapis.com/youtube/v3/channels',
    params: {
      part: 'snippet',
      id: arg.channelId,
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