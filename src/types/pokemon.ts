export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: Array<{
    is_hidden: boolean;
    slot: number;
    ability: {
      name: string;
      url: string;
    };
  }>;
  forms: Array<{
    name: string;
    url: string;
  }>;
  game_indices: Array<{
    game_index: number;
    version: {
      name: string;
      url: string;
    };
  }>;
  held_items: Array<{
    item: {
      name: string;
      url: string;
    };
    version_details: Array<{
      rarity: number;
      version: {
        name: string;
        url: string;
      };
    }>;
  }>;
  location_area_encounters: string;
  moves: Array<{
    move: {
      name: string;
      url: string;
    };
    version_group_details: Array<{
      level_learned_at: number;
      version_group: {
        name: string;
        url: string;
      };
      move_learn_method: {
        name: string;
        url: string;
      };
    }>;
  }>;
  species: {
    name: string;
    url: string;
  };
  cries: {
    latest: string;
    legacy: string;
  };
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }>;
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
  past_types: Array<{
    generation: {
      name: string;
      url: string;
    };
    types: Array<{
      slot: number;
      type: {
        name: string;
        url: string;
      };
    }>;
  }>;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

export interface EvolutionChain {
  id: number;
  baby_trigger_item: null;
  chain: {
    is_baby: boolean;
    species: {
      name: string;
      url: string;
    };
    evolution_details: null;
    evolves_to: Array<{
      is_baby: boolean;
      species: {
        name: string;
        url: string;
      };
      evolution_details: Array<{
        item: null;
        trigger: {
          name: string;
          url: string;
        };
        gender: null;
        held_item: null;
        known_move: null;
        known_move_type: null;
        location: null;
        min_level: number;
        min_happiness: null;
        min_beauty: null;
        min_affection: null;
        needs_overworld_rain: boolean;
        party_species: null;
        party_type: null;
        relative_physical_stats: null;
        time_of_day: string;
        trade_species: null;
        turn_upside_down: boolean;
      }>;
      evolves_to: Array<{
        is_baby: boolean;
        species: {
          name: string;
          url: string;
        };
        evolution_details: Array<{
          item: null;
          trigger: {
            name: string;
            url: string;
          };
          gender: null;
          held_item: null;
          known_move: null;
          known_move_type: null;
          location: null;
          min_level: number;
          min_happiness: null;
          min_beauty: null;
          min_affection: null;
          needs_overworld_rain: boolean;
          party_species: null;
          party_type: null;
          relative_physical_stats: null;
          time_of_day: string;
          trade_species: null;
          turn_upside_down: boolean;
        }>;
        evolves_to: Array<unknown>;
      }>;
    }>;
  };
}

export interface PokemonSpecies {
  id: number;
  name: string;
  order: number;
  gender_rate: number;
  capture_rate: number;
  base_happiness: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  hatch_counter: number;
  has_gender_differences: boolean;
  forms_switchable: boolean;
  growth_rate: {
    name: string;
    url: string;
  };
  pokedex_numbers: Array<{
    entry_number: number;
    pokedex: {
      name: string;
      url: string;
    };
  }>;
  egg_groups: Array<{
    name: string;
    url: string;
  }>;
  color: {
    name: string;
    url: string;
  };
  shape: {
    name: string;
    url: string;
  };
  evolves_from_species: {
    name: string;
    url: string;
  } | null;
  evolution_chain: {
    url: string;
  };
  habitat: null;
  generation: {
    name: string;
    url: string;
  };
  names: Array<{
    name: string;
    language: {
      name: string;
      url: string;
    };
  }>;
  flavor_text_entries: Array<{
    flavor_text: string;
    language: {
      name: string;
      url: string;
    };
    version: {
      name: string;
      url: string;
    };
  }>;
  form_descriptions: Array<{
    description: string;
    language: {
      name: string;
      url: string;
    };
  }>;
  genera: Array<{
    genus: string;
    language: {
      name: string;
      url: string;
    };
  }>;
  varieties: Array<{
    is_default: boolean;
    pokemon: {
      name: string;
      url: string;
    };
  }>;
}
export interface PokemonMove {
  id: number;
  name: string;
  accuracy: number;
  effect_chance: null;
  pp: number;
  priority: number;
  power: number;
  contest_combos: {
    normal: {
      use_before: Array<{
        name: string;
        url: string;
      }>;
      use_after: null;
    };
    super: {
      use_before: null;
      use_after: null;
    };
  };
  contest_type: {
    name: string;
    url: string;
  };
  contest_effect: {
    url: string;
  };
  damage_class: {
    name: string;
    url: string;
  };
  effect_entries: Array<{
    effect: string;
    short_effect: string;
    language: {
      name: string;
      url: string;
    };
  }>;
  effect_changes: Array<object>;
  generation: {
    name: string;
    url: string;
  };
  meta: {
    ailment: {
      name: string;
      url: string;
    };
    category: {
      name: string;
      url: string;
    };
    min_hits: null;
    max_hits: null;
    min_turns: null;
    max_turns: null;
    drain: number;
    healing: number;
    crit_rate: number;
    ailment_chance: number;
    flinch_chance: number;
    stat_chance: number;
  };
  names: Array<{
    name: string;
    language: {
      name: string;
      url: string;
    };
  }>;
  past_values: Array<object>;
  stat_changes: Array<object>;
  super_contest_effect: {
    url: string;
  };
  target: {
    name: string;
    url: string;
  };
  type: {
    name: string;
    url: string;
  };
  learned_by_pokemon: Array<{
    name: string;
    url: string;
  }>;
  flavor_text_entries: Array<{
    flavor_text: string;
    language: {
      url: string;
      name: string;
    };
    version_group: {
      url: string;
      name: string;
    };
  }>;
}
