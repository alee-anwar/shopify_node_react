DOM Parser<script>
  let select = document.getElementById('SortBy');
  let collec_url = '{{ section.settings.collection.url }}'
  select?.addEventListener('change', e=>{
    e.preventDefault();
    document.querySelector('.loading-overlay').style.display = 'block';
    console.log(`${collec_url}?${e.target.name}=${e.target.value}`);
    fetch(`${collec_url}?${e.target.name}=${e.target.value}`)
    .then(function(response) {
      // When the page is loaded convert it to text
      return response.text()
    })
    .then(function(html) {
      // Initialize the DOM parser
      var parser = new DOMParser();

      var doc = parser.parseFromString(html, "text/html");

      document.getElementById('product-grid').innerHTML = doc.getElementById('product-grid').innerHTML;
      document.querySelector('.loading-overlay').style.display='none';    
    })
    .catch(function(err) {  
      console.log('Failed to fetch page: ', err);  
      document.querySelector('.loading-overlay').style.display='none';
    });
  })
</script>