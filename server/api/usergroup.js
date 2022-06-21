const router = require("express").Router();
const { requireLoggedIn } = require("./backendProtect");
const UserGroup = require("../db/models/UserGroup");

// Base route "/api/usergroup"

// //return all wishlists of the user
// router.get("/", async (req, res, next) => {
//   try {
//     const user = await User.findByToken(req.headers.authorization);
//     const wishlists = await Wishlist.findAll({
//       where: {
//         userId: user.id,
//       },
//       include: [{ model: Gift }],
//     });

//     res.send(wishlists);
//   } catch (err) {
//     if (err.status === 401) {
//       res.sendStatus(401);
//     } else next(err);
//   }
// });

// //return wishlist by ID
// router.get("/:id", async (req, res, next) => {
//   try {
//     const user = await User.findByToken(req.headers.authorization);
//     const wishlist = await Wishlist.findOne({
//       where: {
//         id: req.params.id,
//         userId: user.id,
//       },
//       include: [{ model: Gift }],
//     });

//     res.send(wishlist);
//   } catch (err) {
//     if (err.status === 401) {
//       res.sendStatus(401);
//     } else next(err);
//   }
// });

router.delete("/:id", requireLoggedIn, async (req, res, next) => {
    try {
        const group = await UserGroup.findOne({
            where: {
            userId: req.params.id,
            groupId: req.query.groupId
            }
        });

        await group.destroy();

        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
  });


module.exports = router;