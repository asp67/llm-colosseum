// Resource system
class ResourceManager {
    constructor(onResourcesChanged = null) {
        this.food = 200;
        this.wood = 200;
        this.stone = 100;
        this.gold = 50;
        this.population = 0;
        this.maxPopulation = 10;
        this.harvestRate = 1.0;
        this.onResourcesChanged = onResourcesChanged;
    }

    hasResources(cost) {
        return this.food >= (cost.food || 0) &&
               this.wood >= (cost.wood || 0) &&
               this.stone >= (cost.stone || 0) &&
               this.gold >= (cost.gold || 0);
    }

    spendResources(cost) {
        this.food -= (cost.food || 0);
        this.wood -= (cost.wood || 0);
        this.stone -= (cost.stone || 0);
        this.gold -= (cost.gold || 0);
        if (this.onResourcesChanged) this.onResourcesChanged();
    }

    addResource(type, amount) {
        switch(type) {
            case 'food': this.food += amount; break;
            case 'wood': this.wood += amount; break;
            case 'stone': this.stone += amount; break;
            case 'gold': this.gold += amount; break;
        }
        if (this.onResourcesChanged) this.onResourcesChanged();
    }

    getResource(type) {
        switch(type) {
            case 'food': return this.food;
            case 'wood': return this.wood;
            case 'stone': return this.stone;
            case 'gold': return this.gold;
            default: return 0;
        }
    }

    updatePopulation(count) {
        this.population = count;
    }

    canAfford(cost) {
        return this.hasResources(cost);
    }

    updateUI() {
        const tt = (typeof t === 'function') ? t : (k) => k;
        document.getElementById('foodRes').textContent = `${tt('res.food')}: ${Math.floor(this.food)}`;
        document.getElementById('woodRes').textContent = `${tt('res.wood')}: ${Math.floor(this.wood)}`;
        document.getElementById('stoneRes').textContent = `${tt('res.stone')}: ${Math.floor(this.stone)}`;
        document.getElementById('goldRes').textContent = `${tt('res.gold')}: ${Math.floor(this.gold)}`;
        document.getElementById('popRes').textContent = `${tt('res.pop')}: ${this.population}/${this.maxPopulation}`;
    }
}
