'use strict';
/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
const coffee = [
  {
    name: "Espresso",
    price: 2.50,
    description: "Our signature espresso blend, carefully crafted from a rich combination of Arabica beans. This shot of pure indulgence delivers a bold and intense flavor with hints of dark chocolate and a velvety crema. A true coffee lover's delight.",
    default: 'Small-Vanilla Sweet Cream-Hot-No Espresso shot'
  },
  {
    name: "Cappuccino",
    price: 3.50,
    description: " Indulge in the perfect balance of rich espresso, velvety steamed milk, and a luscious layer of frothy foam. Our Classic Cappuccino is expertly crafted to deliver a harmonious blend of flavors, with each sip awakening your senses and leaving you craving for more. The robust aroma of freshly ground beans and the delicate artistry of latte art on the surface make this a truly captivating experience. Savor the essence of Italian coffee culture in every cup.",
    default: 'Small-Whole Mlik-Hot-Signature Espresso Roast'
  },
  {
    name: "Americano",
    price: 2.75,
    description: "Our signature blend of rich espresso and hot water creates the perfect balance of bold flavors. This timeless favorite boasts a smooth and robust taste, with a hint of caramel undertones. Savor the intense aroma and indulge in the velvety texture of this traditional Americano.",
    default: 'Small-Whole Mlik-Hot-Signature Espresso Roast'
  },
  {
    name: "Latte",
    price: 4.00,
    description: "Indulge in the rich, smooth flavors of our Classic Latte. Our expertly crafted espresso shots are expertly blended with velvety steamed milk, creating a harmonious balance of robust coffee and creamy goodness. Savor the delicate hints of caramel and chocolate that dance on your palate, while the frothy milk adds a touch of luxury. Perfectly topped with a sprinkling of cocoa or cinnamon, this timeless beverage is a true coffee lover's delight.  ",
    default: 'Small-Whole Mlik-Hot-Signature Espresso Roast'
  },
  {
    name: "Mocha",
    price: 4.25,
    description: " Indulge in the perfect blend of rich espresso and smooth, velvety chocolate with our signature Mocha. This luscious creation starts with a double shot of our finest Arabica coffee, expertly brewed to perfection. We then delicately blend in a generous portion of premium, Belgian dark chocolate, creating a harmonious fusion of flavors that will satisfy even the most discerning palate. ",
    default: 'Small-Whole Mlik-Hot-Signature Espresso Roast'
  },
  {
    name: "Macchiato",
    price: 3.99,
    description: "Enjoy the perfect balance of bold espresso and velvety steamed milk with our Classic Macchiato. Our expertly pulled shots of espresso are delicately `marked` with a dollop of foamed milk, creating a harmonious blend of robust flavors and a creamy texture. This traditional Italian favorite is the ideal choice for those seeking a simple yet satisfying coffee experience. ",
    default: 'Small-Whole Mlik-Hot-Signature Espresso Roast'
  },
  {
    name: "Flat White",
    price: 4.50,
    description: "Smooth and velvety, our Flat White is the ultimate espresso-based indulgence. We carefully craft a double shot of rich, full-bodied espresso, combined with perfectly steamed milk, creating a harmonious balance of flavors. This luxurious beverage offers a subtle hint of caramel and a delicate, creamy texture that will leave you craving for more. Savor every sip of our Flat White, a true coffee connoisseur's delight ",
    default: 'Small-Whole Mlik-Hot-Signature Espresso Roast'
  },
  {
    name: "Affogato",
    price: 5.00,
    description: " Indulge in our heavenly Affogato - a delightful union of rich, smooth espresso and velvety vanilla gelato. A symphony of flavors awaits as a single shot of our freshly brewed espresso is poured over a generous scoop of luscious, artisanal vanilla gelato. Watch as the steam rises, mingling with the cold creaminess of the gelato, creating a tantalizing dance of temperature and texture.   ",
    default: 'Small-Whole Mlik-Cold-1/3 Decaf Espresso Roast'
  },
  {
    name: "Turkish Coffee",
    price: 3.25,
    description: "Experience the rich and authentic flavors of Turkey with our signature Turkish Coffee. Served in a traditional copper cezve, this exquisite blend of finely ground Arabica beans and cardamom is brewed to perfection. Indulge in the velvety texture and intense aroma as you savor each sip of this time-honored delicacy  ",
    default: 'Small-No Creamer-Hot-Blond Espresso Roast'
  },
  {
    name: "Irish Coffee",
    price: 5.50,
    description: " Indulge in the perfect blend of rich flavors and warm sensations with our signature Irish Coffee. This classic combination of smooth Irish whiskey, robust coffee, velvety whipped cream, and a touch of sweetness is sure to delight your taste buds.",
    default: 'Small-Vanilla Sweet Cream-Warm-No Espresso shot'
  },
]

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    options.tableName = 'Coffees';
    return queryInterface.bulkInsert(options, coffee, {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Coffees';
    return queryInterface.bulkDelete(options, coffee, {})
  }
};
