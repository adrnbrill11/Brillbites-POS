const menuItems = [
  // ===== SNACKS =====

  // Burger - Classic
  {
    id: 1,
    name: "Classic Burger Solo",
    type: "Burger",
    variant: "Classic",
    deal: "Solo",
    price: 30,
  },
  {
    id: 2,
    name: "Classic Burger Buy 1 Take 1",
    type: "Burger",
    variant: "Classic",
    deal: "Buy 1 Take 1",
    price: 55,
  },

  // Burger - Cheese
  {
    id: 3,
    name: "Cheese Burger Solo",
    type: "Burger",
    variant: "Cheese",
    deal: "Solo",
    price: 40,
  },
  {
    id: 4,
    name: "Cheese Burger Buy 1 Take 1",
    type: "Burger",
    variant: "Cheese",
    deal: "Buy 1 Take 1",
    price: 75,
  },

  // Fries
  {
    id: 5,
    name: "Small Fries Cheese",
    size: "Small",
    type: "Fries",
    flavor: "Cheese",
    price: 30,
  },
  {
    id: 6,
    size: "Small",
    type: "Fries",
    flavor: "Sour Cream",
    price: 30,
  },
  {
    id: 7,
    size: "Small",
    type: "Fries",
    flavor: "BBQ",
    price: 30,
  },

  {
    id: 8,
    size: "Medium",
    type: "Fries",
    flavor: "Cheese",
    price: 50,
  },
  {
    id: 9,
    size: "Medium",
    type: "Fries",
    flavor: "Sour Cream",
    price: 50,
  },
  {
    id: 10,
    size: "Medium",
    type: "Fries",
    flavor: "BBQ",
    price: 50,
  },
  // Large Fries
  {
    id: 71,
    size: "Large",
    type: "Fries",
    flavor: "Cheese",
    price: 75
  },
  {
    id: 72,
    size: "Large",
    type: "Fries",
    flavor: "Sour Cream",
    price: 75
  },
  {
    id: 73,
    size: "Large",
    type: "Fries",
    flavor: "BBQ",
    price: 75
  },

  // ===== DRINKS =====

  // Milkshake
  {
    id: 11,
    type: "Milkshake",
    flavor: "Caramel Macchiato",
    size: "16oz",
    price: 48,
  },

  {
    id: 12,
    type: "Milkshake",
    flavor: "Caramel Macchiato",
    size: "22oz",
    price: 58,
  },
  {
    id: 13,
    type: "Milkshake",
    flavor: "Cookies and Cream",
    size: "16oz",
    price: 48,
  },
  {
    id: 14,
    type: "Milkshake",
    flavor: "Cookies and Cream",
    size: "22oz",
    price: 58,
  },
  {
    id: 15,
    type: "Milkshake",
    flavor: "Coffee Crumble",
    size: "16oz",
    price: 48,
  },
  {
    id: 16,
    type: "Milkshake",
    flavor: "Coffee Crumble",
    size: "22oz",
    price: 58,
  },
  {
    id: 17,
    type: "Milkshake",
    flavor: "Double Dutch",
    size: "16oz",
    price: 48,
  },
  {
    id: 18,
    type: "Milkshake",
    flavor: "Double Dutch",
    size: "22oz",
    price: 58,
  },
  {
    id: 19,
    type: "Milkshake",
    flavor: "Choco Fudge",
    size: "16oz",
    price: 48,
  },
  {
    id: 20,
    type: "Milkshake",
    flavor: "Choco Fudge",
    size: "22oz",
    price: 58,
  },
  {
    id: 21,
    type: "Milkshake",
    flavor: "Buko Pandan",
    size: "16oz",
    price: 48,
  },
  {
    id: 22,
    type: "Milkshake",
    flavor: "Buko Pandan",
    size: "22oz",
    price: 58,
  },
  {
    id: 23,
    type: "Milkshake",
    flavor: "Rocky Road",
    size: "16oz",
    price: 48,
  },
  {
    id: 24,
    type: "Milkshake",
    flavor: "Rocky Road",
    size: "22oz",
    price: 58,
  },
  {
    id: 25,
    type: "Milkshake",
    flavor: "Strawberry",
    size: "16oz",
    price: 48,
  },
  {
    id: 26,
    type: "Milkshake",
    flavor: "Strawberry",
    size: "22oz",
    price: 58,
  },
  {
    id: 27,
    type: "Milkshake",
    flavor: "Leche Flan",
    size: "16oz",
    price: 48,
  },
  {
    id: 28,
    type: "Milkshake",
    flavor: "Leche Flan",
    size: "22oz",
    price: 58,
  },
  {
    id: 29,
    type: "Milkshake",
    flavor: "Avocado",
    size: "16oz",
    price: 48,
  },
  {
    id: 30,
    type: "Milkshake",
    flavor: "Avocado",
    size: "22oz",
    price: 58,
  },
  {
    id: 31,
    type: "Milkshake",
    flavor: "Mango",
    size: "16oz",
    price: 48,
  },
  {
    id: 32,
    type: "Milkshake",
    flavor: "Mango",
    size: "22oz",
    price: 58,
  },

  // Fruit Soda
  {
    id: 33,
    type: "Fruit Soda",
    flavor: "Green Apple",
    size: "16oz",
    price: 48,
  },
  {
    id: 34,
    type: "Fruit Soda",
    flavor: "Green Apple",
    size: "22oz",
    price: 58,
  },
  {
    id: 35,
    type: "Fruit Soda",
    flavor: "Bubblegum",
    size: "16oz",
    price: 48,
  },
  {
    id: 36,
    type: "Fruit Soda",
    flavor: "Bubblegum",
    size: "22oz",
    price: 58,
  },
  {
    id: 37,
    type: "Fruit Soda",
    flavor: "Strawberry",
    size: "16oz",
    price: 48,
  },
  {
    id: 38,
    type: "Fruit Soda",
    flavor: "Strawberry",
    size: "22oz",
    price: 58,
  },
  {
    id: 39,
    type: "Fruit Soda",
    flavor: "Blueberry",
    size: "16oz",
    price: 48,
  },
  {
    id: 40,
    type: "Fruit Soda",
    flavor: "Blueberry",
    size: "22oz",
    price: 58,
  },
  {
    id: 41,
    type: "Fruit Soda",
    flavor: "Lychee",
    size: "16oz",
    price: 48,
  },
  {
    id: 42,
    type: "Fruit Soda",
    flavor: "Lychee",
    size: "22oz",
    price: 58,
  },
  {
    id: 43,
    type: "Fruit Soda",
    flavor: "Grapes",
    size: "16oz",
    price: 48,
  },
  {
    id: 44,
    type: "Fruit Soda",
    flavor: "Grapes",
    size: "22oz",
    price: 58,
  },
  {
    id: 45,
    type: "Fruit Soda",
    flavor: "Mango",
    size: "16oz",
    price: 48,
  },
  {
    id: 46,
    type: "Fruit Soda",
    flavor: "Mango",
    size: "22oz",
    price: 58,
  },
  {
    id: 47,
    type: "Fruit Soda",
    flavor: "Orange",
    size: "16oz",
    price: 48,
  },
  {
    id: 48,
    type: "Fruit Soda",
    flavor: "Orange",
    size: "22oz",
    price: 58,
  },

  //Frappe
  {
    id: 49,
    type: "Frappe",
    flavor: "Caramel Macchiato",
    size: "16oz",
    price: 65,
  },
  {
    id: 50,
    type: "Frappe",
    flavor: "Caramel Macchiato",
    size: "22oz",
    price: 75,
  },
  {
    id: 51,
    type: "Frappe",
    flavor: "Cookies and Cream",
    size: "16oz",
    price: 65,
  },
  {
    id: 52,
    type: "Frappe",
    flavor: "Cookies and Cream",
    size: "22oz",
    price: 75,
  },
  {
    id: 53,
    type: "Frappe",
    flavor: "Coffee Crumble",
    size: "16oz",
    price: 65,
  },
  {
    id: 54,
    type: "Frappe",
    flavor: "Coffee Crumble",
    size: "22oz",
    price: 75,
  },
  {
    id: 55,
    type: "Frappe",
    flavor: "Double Dutch",
    size: "16oz",
    price: 65,
  },
  {
    id: 56,
    type: "Frappe",
    flavor: "Double Dutch",
    size: "22oz",
    price: 75,
  },
  {
    id: 57,
    type: "Frappe",
    flavor: "Choco Fudge",
    size: "16oz",
    price: 65,
  },
  {
    id: 58,
    type: "Frappe",
    flavor: "Choco Fudge",
    size: "22oz",
    price: 75,
  },
  {
    id: 59,
    type: "Frappe",
    flavor: "Buko Pandan",
    size: "16oz",
    price: 65,
  },
  {
    id: 60,
    type: "Frappe",
    flavor: "Buko Pandan",
    size: "22oz",
    price: 75,
  },
  {
    id: 61,
    type: "Frappe",
    flavor: "Rocky Road",
    size: "16oz",
    price: 65,
  },
  {
    id: 62,
    type: "Frappe",
    flavor: "Rocky Road",
    size: "22oz",
    price: 75,
  },
  {
    id: 63,
    type: "Frappe",
    flavor: "Strawberry",
    size: "16oz",
    price: 65,
  },
  {
    id: 64,
    type: "Frappe",
    flavor: "Strawberry",
    size: "22oz",
    price: 75,
  },
  {
    id: 65,
    type: "Frappe",
    flavor: "Leche Flan",
    size: "16oz",
    price: 65,
  },
  {
    id: 66,
    type: "Frappe",
    flavor: "Leche Flan",
    size: "22oz",
    price: 75,
  },
  {
    id: 67,
    type: "Frappe",
    flavor: "Avocado",
    size: "16oz",
    price: 65,
  },
  {
    id: 68,
    type: "Frappe",
    flavor: "Avocado",
    size: "22oz",
    price: 75,
  },
  {
    id: 69,
    type: "Frappe",
    flavor: "Mango",
    size: "16oz",
    price: 65,
  },
  {
    id: 70,
    type: "Frappe",
    flavor: "Mango",
    size: "22oz",
    price: 75,
  },

  {
    id: 71,
    type: "Fries",
    flavor: "Salt",
    size: "Small",
    price: 30,
  },

  {
    id: 72,
    type: "Fries",
    flavor: "Salt",
    size: "Medium",
    price: 50,
  },

  {
    id: 73,
    type: "Fries",
    flavor: "Salt",
    size: "Large",
    price: 75
  },

  //Ice Coffee 
  {
    id: 74,
    type: "IceCoffee",
    flavor: "Caramel Machiatto",
    price: 95
  },
  {
    id: 75,
    type: "IceCoffee",
    flavor: "Spanish Latte",
    price: 85
  },
  {
    id: 76,
    type: "IceCoffee",
    flavor: "White Choco Latte",
    price: 95
  },

  //Ham Sandwich in Buns
  {
    id: 77,
    type: "HamSandwich",
    name: "Ham Sandwich in Buns",
    selectedType: "Ham Sandwich Buns",
    price: 28,
  
  },

  {
    id: 78,
    type: "HamSandwich",
    name: "Ham W/ Cheese in Buns",
    selectedType: "Ham w/Cheese Buns",
    price: 35
  },

  {
    id: 79,
    type: "HamSandwich",
    name: "Ham W/ Egg in Buns",
    selectedType: "Ham w/Egg Buns",
    price: 40
  },

  {
    id: 80,
    type: "HamSandwich",
    name: "Ham W/ Egg and Cheese in Buns",
    selectedType: "Ham w/Egg Cheese Buns",
    price: 50
  },

  //AddONS

  {
    id: 81,
    type: "addOns",
    name: "Extra Egg",
    price: 15
  },

  {
    id: 82,
    type: "addOns",
    name: "Extra Cheese",
    price: 10
  },

  {
    id: 83,
    type: "addOns",
    name: "Extra Burger",
    price: 15
  },


];

const menuItemsWithNames = menuItems.map((item) => {
  if (item.name) {
    return item;
  }

  if (item.type === "Fries") {
    return {
      ...item,
      name: `${item.size} Fries ${item.flavor}`,
    };
  }

  if (
    item.type === "Milkshake" ||
    item.type === "Fruit Soda" ||
    item.type === "Frappe"

  ) {
    return {
      ...item,
      name: `${item.flavor} ${item.type} ${item.size}`,
    };

  } else {
    item.type === "IceCoffee"
  }

  return {
    ...item,
    name: `${item.flavor} ${item.type}`,
  };
});


export default menuItemsWithNames;
