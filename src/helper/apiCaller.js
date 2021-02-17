import axios from 'axios';

export function get(url) {
    return axios.get(url)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
          return { error: 'An error occur, please contact admin.' };
      })
}

