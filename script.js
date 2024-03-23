

const apikey='36d7f08f11bb46558e2332cdd9c1f4c5';
const blogcontainer=document.getElementById("blog");
const searchelement=document.getElementById("search-input");
const searchbutton=document.getElementById("search-button");
searchbutton.addEventListener("click",async ()=>{
    const query=searchelement.value.trim();
    if(query!==""){
        try{
            const articles=await fetchNewsQuery(query);
            displayblog(articles);
        }
        catch(error){
            console.log("Error fetching news");
        }
    }
})
async function fetchRandomNews(){
    try{
    const apiurl=`https://newsapi.org/v2/top-headlines?country=us&pageSize=12&apikey=${apikey}`;
    const response=await fetch(apiurl);
    const data=await response.json();
    console.log(data);
    return data.articles;
    }
    catch(error){
        console.error("Error in fetching");
        return [];
    }
 }

 async function fetchNewsQuery(query){
    try{
        const apiurl=`https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apikey}`;
        const response=await fetch(apiurl);
        const data=await response.json();
        console.log(data);
        return data.articles;
        }
        catch(error){
            console.error("Error in fetching");
            return [];
        }
 }

 function displayblog(articles){
    blogcontainer.innerHTML="";
    articles.forEach(article => {
        const blogcard=document.createElement("div");
        blogcard.classList.add("blog-card");
        const img=document.createElement("img");
        img.src=article.urlToImage;
        img.alt=article.title;
        const title =document.createElement("h2");
        const truncate=article.title.length>30?
        article.title.slice(0,30)+"...":article.title;
        title.textContent=truncate;
        const description=document.createElement("a");
        const truncatedescription=article.description.length>200?article.description.slice(0,200)+"...":
        article.description;
        description.textContent=truncatedescription;
        blogcard.appendChild(img);
        blogcard.appendChild(title);
        blogcard.appendChild(description);
        blogcard.addEventListener('click',()=>{  //onclick new window
            window.open(article.url,"_blank")
        })
        blogcontainer.appendChild(blogcard);
   
    });

 }
 (async()=>{
    try{
        const articles=await fetchRandomNews();
        displayblog(articles);
    }
    catch(error){
        console.error("Error in fetching");
    }
 })();