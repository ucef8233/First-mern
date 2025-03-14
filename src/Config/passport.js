const JwtSrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const User = require('../Models/user.model');

module.exports = (passport) => {
  let config = {}
  config.secretOrKey = process.env.JWT_SECRET
  config.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
  passport.use(new JwtSrategy(config, async (jwtPayload, done) => {
    try {
      const user = await User.findById(jwtPayload._id)
      if (user) return done(null, user)
      else return done(null, false)
    } catch (e) {
      return done(err,false)
    }
  }))
}

