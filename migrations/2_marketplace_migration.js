const MarketplaaceMigration = artifacts.require('CourseMarketplace')

module.exports = function (deployer) {
	deployer.deploy(MarketplaaceMigration)
}
