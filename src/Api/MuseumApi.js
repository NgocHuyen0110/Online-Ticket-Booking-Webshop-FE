import axios from "axios"
import TokenManager from "../components/TokenManager";
const MuseumApi ={
    getMuseums: () => axios.get("http://localhost:8080/museums")
    .then(result => result.data.museums) ,

    createMuseum: (newMuseum) => {
        const accessToken = TokenManager.getAccessToken();
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        return axios.post('http://localhost:8080/museums', newMuseum, { headers })
          .then(response => response.data.id);
      },
      deleteMuseum: (id) => axios.delete(`http://localhost:8080/museums/${id}`,
      {
          headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
      }) ,
   getMuseumsByName:(searchText)=>{
    const accessToken = TokenManager.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };  
    return axios.get(`http://localhost:8080/museums/search?name=${searchText}`, {headers})
    .then(response => response.data.museums)
   },
   
   updateMuseum: (id, updatedMuseum) => {
    const accessToken = TokenManager.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    return axios.put(`http://localhost:8080/museums/${id}`, updatedMuseum, { headers })
    .then(response => response.data.id);
  }

}
export default MuseumApi;