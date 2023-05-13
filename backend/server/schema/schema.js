//Mongoose models
const Order = require("../models/Order");
const User = require("../models/User");
const Menu = require("../models/Menu");
const MenuItem = require("../models/MenuItem");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLInt,
  GraphQLFloat,
} = require("graphql");

//User Type
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
    phone: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) },
    createdOrders: {
      type: GraphQLNonNull(new GraphQLList(GraphQLNonNull(OrderType))),
      resolve(parent, args) {
        return Order.find({ userId: parent.id });
      },
    },
  }),
});

const MenuType = new GraphQLObjectType({
  name: "Menu",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLNonNull(GraphQLString) },
    dishes: {
      type: GraphQLNonNull(new GraphQLList(GraphQLNonNull(MenuItemsType))),
      resolve(parent, args) {
        return MenuItem.find({ type: parent.id });
      },
    },
  }),
});

const MenuItemsType = new GraphQLObjectType({
  name: "MenuItem",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    type: { type: GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLNonNull(GraphQLString) },
  }),
});

const AuthDataType = new GraphQLObjectType({
  name: "AuthData",
  fields: () => ({
    userId: { type: GraphQLNonNull(GraphQLID) },
    token: { type: GraphQLNonNull(GraphQLString) },
    tokenExpiration: { type: GraphQLNonNull(GraphQLString) },
  }),
});

//Order Type
const OrderType = new GraphQLObjectType({
  name: "Order",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLNonNull(GraphQLString) },
    dateFrom: { type: GraphQLNonNull(GraphQLString) },
    dateTo: { type: GraphQLNonNull(GraphQLString) },
    amount: { type: GraphQLNonNull(GraphQLFloat) },
    quantity: { type: GraphQLNonNull(GraphQLInt) },
    status: { type: GraphQLString },
    user: {
      type: GraphQLNonNull(UserType),
      resolve(parent, args) {
        return User.findById(parent.userId);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    orders: {
      type: GraphQLNonNull(new GraphQLList(GraphQLNonNull(OrderType))),
      resolve(parents, args) {
        return Order.find();
      },
    },
    order: {
      type: GraphQLNonNull(OrderType),
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Order.findById(args.id);
      },
    },
    users: {
      type: GraphQLNonNull(new GraphQLList(GraphQLNonNull(UserType))),
      resolve(parents, args) {
        return User.find();
      },
    },
    user: {
      type: GraphQLNonNull(UserType),
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return User.findById(args.id);
      },
    },
    menus: {
      type: GraphQLNonNull(new GraphQLList(GraphQLNonNull(MenuType))),
      resolve(parents, args) {
        return Menu.find();
      },
    },
    menu: {
      type: MenuType,
      args: { name: { type: GraphQLString } },
      resolve(parents, args) {
        return Menu.findOne({ name: args.name });
      },
    },
  },
});

// Mutations

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    login: {
      type: AuthDataType,
      args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const user = await User.findOne({ email: args.email });
        if (!user) {
          throw new Error("User does not exist!");
        }
        const isEqual = await bcrypt.compare(args.password, user.password);
        if (!isEqual) {
          throw new Error("Password is incorrect!");
        }
        const token = jwt.sign(
          { userId: user.id, email: user.email },
          "somesupersecretkey",
          {
            expiresIn: "1h",
          }
        );
        return { userId: user.id, token: token, tokenExpiration: 1 };
      },
    },
    addMenu: {
      type: MenuType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const menu = new Menu({
          name: args.name,
        });
        return menu.save();
      },
    },
    addMenuItem: {
      type: MenuItemsType,
      args: {
        type: { type: GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const menuItem = new MenuItem({
          name: args.name,
          type: args.type,
          description: args.description,
        });
        return menuItem.save();
      },
    },
    //Add user
    addUser: {
      type: UserType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const existingUser = await User.findOne({ email: args.email });
        if (existingUser) {
          throw new Error("User exists already.");
        }
        const hashedPassword = await bcrypt.hash(args.password, 12);
        const user = new User({
          name: args.name,
          email: args.email,
          phone: args.phone,
          password: hashedPassword,
        });
        return user.save();
      },
    },
    //Delete User
    deleteUser: {
      type: UserType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        await Order.deleteMany({ userId: args.id });

        return User.findByIdAndRemove(args.id);
      },
    },
    //Add a order
    addOrder: {
      type: OrderType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: "OrderStatus",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
          defaultValue: "Not Started",
        },
        dateFrom: { type: GraphQLNonNull(GraphQLString) },
        dateTo: { type: GraphQLNonNull(GraphQLString) },
        amount: { type: GraphQLNonNull(GraphQLFloat) },
        quantity: { type: GraphQLNonNull(GraphQLInt) },
        // userId: { type: GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args, req) {
        if (!req.isAuth) {
          throw new Error("Unauthenticated!");
        }
        const order = new Order({
          name: args.name,
          description: args.description,
          status: args.status,
          dateFrom: new Date(args.dateFrom),
          dateTo: new Date(args.dateTo),
          amount: +args.amount,
          quantity: args.quantity,
          userId: req.userId,
        });

        const result = await order.save();
        const creator = await User.findById(req.userId);

        if (!creator) {
          throw new Error("User not found.");
        }

        return result;
      },
    },
    //delete a order
    deleteOrder: {
      type: OrderType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Order.findByIdAndRemove(args.id);
      },
    },
    //Update user
    updateUser: {
      type: UserType,
      args: {
        id: {type: GraphQLNonNull(GraphQLID)},
        name: { type: GraphQLString},
        email: {type:GraphQLString},
        phone: {type: GraphQLString},
      },
      resolve(parent,args) {
        return User.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              email: args.email,
              phone: args.phone,
            },
          },
          { new: true }
        );
      }
    },
    //Update order
    updateOrder: {
      type: OrderType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "OrderStatusUpdate",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
        },
        dateTo: { type: GraphQLString },
        dateFrom: { type: GraphQLString },
        amount: { type: GraphQLFloat },
        quantity: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return Order.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status,
            },
          },
          { new: true }
        );
      },
    },
    updateOrderStatus: {
      type: OrderType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        status: {
          type: new GraphQLEnumType({
            name: "OrderStatusUpdateNew",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
        },
      },
      resolve(parent, args) {
        return Order.findByIdAndUpdate(
          args.id,
          {
            $set: {
              status: args.status,
            },
          },
          { new: true }
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
