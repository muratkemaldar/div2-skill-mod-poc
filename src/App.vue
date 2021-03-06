<template>
  <div class="app">
    <h1 style="margin-bottom: 0">
      The Division 2 - Skill Mod Proof of Concept
    </h1>
    <p class="block">
      <a href="https://twitter.com/murimuffin5">by @murimuffin5</a>
    </p>
    <div class="player block">
      <h2>Player Skill Power: {{ player.skillPower }}</h2>
      <div class="btn-group">
        <button
          :disabled="player.skillPower === 0"
          @click="player.skillPower = 0"
        >
          0 Skill Power
        </button>
        <button
          :disabled="player.skillPower === 771"
          @click="player.skillPower = 771"
        >
          771 Skill Power
        </button>
        <button
          :disabled="player.skillPower === 1197"
          @click="player.skillPower = 1197"
        >
          1197 Skill Power
        </button>
        <button
          :disabled="player.skillPower === 2083"
          @click="player.skillPower = 2083"
        >
          2083 Skill Power
        </button>
      </div>
    </div>
    <div class="skills block">
      <div class="skill-desc block">
        <h2>Skill: {{ skill.name }}</h2>
        <div>
          <div :class="[totalDamage > skill.damage && 'bonus']">
            <strong>
              Total Damage: {{ totalDamage.toFixed(2) }} / second
            </strong>
          </div>

          <div :class="[totalAmmo > skill.ammo && 'bonus']">
            <strong> Total Ammo: {{ totalAmmo.toFixed(2) }} </strong>
          </div>

          <div :class="[totalRadius > skill.radius && 'bonus']">
            <strong> Total Radius: {{ totalRadius.toFixed(2) }} m </strong>
          </div>
        </div>
      </div>
      <div class="grid">
        <div class="slots">
          <ul>
            <li v-for="slot in skill.slots" :key="slot.id">
              <a
                :class="[
                  'box',
                  activeSlot && activeSlot.id === slot.id && 'active'
                ]"
                role="button"
                @click="setActiveSlot(slot.id)"
              >
                <strong class="box-label">{{ slot.name }}</strong>
                <div>
                  <span v-if="slot.equipped">
                    {{ getMod(slot.equipped).name }}
                  </span>
                  <i class="muted" v-else>
                    Nothing equipped
                  </i>
                </div>
                <div class="bonus" v-if="slot.equipped">
                  <strong>
                    +
                    {{ getTotalModBonus(getMod(slot.equipped).id).toFixed(2) }}
                    {{ getMod(slot.equipped).suffix }}
                  </strong>
                </div>
              </a>
            </li>
          </ul>
        </div>
        <div v-if="activeSlot" class="slot-options">
          <hr style="margin: 0 0 30px;" class="mobile-only" />
          <ul class="mods">
            <li class="block" v-for="mod in mods" :key="mod.id">
              <a
                :class="[
                  'box',
                  isModEquippedForOtherSlot(mod.id, activeSlot.id) &&
                    'disabled',
                  isModEquippedForSlot(mod.id, activeSlot.id) && 'active'
                ]"
                role="button"
                @click="setSlotMod(activeSlot.id, mod.id)"
              >
                <strong class="box-label">{{ mod.name }}</strong>
                <div>+ {{ mod.baseValue }} {{ mod.suffix }} (Base Value)</div>
                <div class="bonus">
                  + {{ mod.scale(player.skillPower).toFixed(2) }}
                  {{ mod.suffix }} ({{ mod.scale(100).toFixed(2) }} for every
                  100 Skill Power)
                </div>
                <hr />
                <div class="bonus">
                  <strong>
                    +
                    {{ getTotalModBonus(mod.id).toFixed(2) }}
                    {{ mod.suffix }}
                  </strong>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  methods: {
    getMod(id) {
      return this.mods.find(mod => mod.id === id);
    },
    getTotalModBonus(modId) {
      const mod = this.mods.find(mod => mod.id === modId);
      if (mod) {
        return mod.baseValue + mod.scale(this.player.skillPower);
      }
    },
    getEquippedModsForAttribute(attribute) {
      return this.mods.filter(
        mod => this.isModEquipped(mod.id) && mod.attribute === attribute
      );
    },
    setActiveSlot(id) {
      this.activeSlotId = id;
    },
    setSlotMod(slotId, modId) {
      const slot = this.skill.slots.find(slot => slot.id === slotId);
      if (slot) {
        if (slot.equipped === modId) {
          slot.equipped = null;
        } else {
          slot.equipped = modId;
        }
      }
    },
    isModEquippedForOtherSlot(modId, exceptSlotId) {
      return this.skill.slots
        .filter(slot => slot.id !== exceptSlotId)
        .some(slot => slot.equipped === modId);
    },
    isModEquippedForSlot(modId, slotId) {
      const slot = this.skill.slots.find(slot => slot.id === slotId);
      if (slot) {
        return slot.equipped === modId;
      }
    },
    isModEquipped(modId) {
      return this.skill.slots.some(slot => slot.equipped === modId);
    }
  },
  computed: {
    activeSlot() {
      return this.skill.slots.find(slot => slot.id === this.activeSlotId);
    },
    totalDamage() {
      const mods = this.getEquippedModsForAttribute("damage");
      const totalModifier = mods.reduce((total, curr) => {
        return (
          total + (curr.baseValue + curr.scale(this.player.skillPower)) / 100
        );
      }, 1);
      return this.skill.damage * totalModifier;
    },
    totalAmmo() {
      const mods = this.getEquippedModsForAttribute("ammo");
      const totalModifier = mods.reduce((total, curr) => {
        return total + (curr.baseValue + curr.scale(this.player.skillPower));
      }, 0);
      return this.skill.ammo + totalModifier;
    },
    totalRadius() {
      const mods = this.getEquippedModsForAttribute("radius");
      const totalModifier = mods.reduce((total, curr) => {
        return (
          total + (curr.baseValue + curr.scale(this.player.skillPower)) / 100
        );
      }, 1);
      return this.skill.radius * totalModifier;
    }
  },
  data() {
    return {
      activeSlotId: null,
      player: {
        skillPower: 771
      },
      mods: [
        {
          id: "mod-a",
          attribute: "damage",
          name: "Mod: Damage (High Scaling / Low Base)",
          suffix: "% Damage",
          type: "multiply",
          baseValue: 5,
          scale: skillPower => {
            return skillPower / 50;
          }
        },
        {
          id: "mod-a2",
          attribute: "damage",
          name: "Mod: Damage (Low Scaling / High Base)",
          suffix: "% Damage",
          baseValue: 10,
          scale: skillPower => {
            return skillPower / 300;
          }
        },
        {
          id: "mod-b",
          attribute: "ammo",
          name: "Mod: Ammo",
          suffix: "Ammo",
          baseValue: 3,
          scale: skillPower => {
            return skillPower / 350;
          }
        },
        {
          id: "mod-c",
          attribute: "radius",
          name: "Mod: Radius",
          suffix: "% Radius",
          baseValue: 10,
          scale: skillPower => {
            return skillPower / 50;
          }
        }
      ],
      skill: {
        name: "Chem Launcher - Oxidizer",
        ammo: 3,
        damage: 12000,
        radius: 5,
        slots: [
          {
            id: "slot1",
            name: "Slot A",
            equipped: null
          },
          {
            id: "slot2",
            name: "Slot B",
            equipped: null
          }
        ]
      }
    };
  }
};
</script>


<style lang="scss">
.app {
  --padding: 1.25em;
  padding: var(--padding);
  font-family: Helvetica, Segoe UI, sans-serif;
  line-height: 1.3;
  font-size: 15px;

  @media screen and (min-width: 640px) {
    --padding: 1.5em;
  }
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: var(--padding);

  @media screen and (min-width: 640px) {
    grid-template-columns: 1fr 2fr;
  }
}

.block {
  &:not(:last-child) {
    margin-bottom: calc(var(--padding) + 5px);
  }
}

.muted {
  opacity: 0.5;
}

a {
  cursor: pointer;
  text-decoration: none;
}

.box {
  padding: var(--padding);
  display: block;
  border: 1px solid black;
  position: relative;

  &-label {
    position: absolute;
    top: 0;
    background: white;
    display: inline-block;
    transform: translate(-0.75em, -50%);
    padding: 0 0.75em;
    font-size: 0.875em;
  }

  &:hover {
    border-color: #f28c18;
  }
}

.mobile-only {
  @media screen and (min-width: 640px) {
    display: none;
  }
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin-bottom: 0.45em;
  &:first-child {
    margin-top: 0;
  }
}

p {
  margin-top: 0;
  &:last-child {
    margin-bottom: 0;
  }
}

button {
  padding: 6px 10px 4px;
  cursor: pointer;
  line-height: 0;
  background: none;
  border: 1px solid #f28c18;
  color: #f28c18;
  font: inherit;
  margin-right: 10px;
  margin-bottom: 10px;

  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.active {
  outline: 2px solid #f28c18;
  border: 1px solid #f28c18;
}

hr {
  height: 1px;
  color: #aaa;
  background: #aaa;
  border: none;
}

.disabled {
  opacity: 0.5;
  pointer-events: none;
  cursor: not-allowed;
}

.bonus {
  color: green;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    &:not(:last-child) {
      margin-bottom: calc(var(--padding) + 5px);
    }
  }
}
</style>
