function fetchAndDisplayItem(itemId, containerId) {
  fetch(`https://api.kedufront.juniortaker.com/item/${itemId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (!data.item) {
        throw new Error('Item not found or response format is incorrect');
      }
      const container = document.getElementById(containerId);
      const item = data.item;
      container.innerHTML = `
          <img id="itemImg${itemId}" alt="Image de ${item.name}" class="item-img">
          <h2>${item.name}</h2>
          <p class="item-description">${item.description}</p>
          <p class="item-price">Prix: ${item.price}€</p>
          <p>Date de création: ${item.createdIn}</p>
      `;
      return itemId;
    })
    .then(itemId => {
      const imageUrl = `https://api.kedufront.juniortaker.com/item/picture/${itemId}`;
      document.getElementById(`itemImg${itemId}`).src = imageUrl;
    })
    .catch(error => {
      console.error(`Error fetching item ${itemId}:`, error);
      const container = document.getElementById(containerId);
      container.innerHTML = `<p>Erreur lors du chargement de l'item ${itemId}</p>`;
    });
}

document.addEventListener('DOMContentLoaded', function() {
  fetchAndDisplayItem(1, 'item1');
  fetchAndDisplayItem(2, 'item2');
  fetchAndDisplayItem(3, 'item3');
});
