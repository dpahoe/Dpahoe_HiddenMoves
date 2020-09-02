//=============================================================================
// Dpahoe_HiddenMoves.js
//=============================================================================
/*:
 * @plugindesc [1.0] Enables Hidden Moves (HM) usages outside battle 
 *
 * @author Dpahoe
 *
 * @param Skill-A ID
 * @desc Insert Skill ID found in the database
 * @default 0
 *
 * @param Skill-A Event text
 * @desc Text to be displayed, while activating the move. %1 will be replaced by Skill name.
 * @default %1 is usable now!
 *
 * @param Skill-A Object text
 * @desc Text to be displayed, when player interacts with an HM applicable object. %1 will be replaced by Skill name.
 * @default Use %1 on this object
 *
 * @param Skill-B ID
 * @desc Insert Skill ID found in the database
 * @default 0
 *
 * @param Skill-B Event text
 * @desc Text to be displayed, while activating the move. %1 will be replaced by Skill name.
 * @default %1 is usable now!
 *
 * @param Skill-B Object text
 * @desc Text to be displayed, when player interacts with an HM applicable object. %1 will be replaced by Skill name.
 * @default Use %1 on this object
 *
 * @param Skill-C ID
 * @desc Insert Skill ID found in the database
 * @default 0
 *
 * @param Skill-C Event text
 * @desc Text to be displayed, while activating the move. %1 will be replaced by Skill name.
 * @default %1 is usable now!
 *
 * @param Skill-C Object text
 * @desc Text to be displayed, when player interacts with an HM applicable object. %1 will be replaced by Skill name.
 * @default Use %1 on this object
 *
 * @param Skill-D ID
 * @desc Insert Skill ID found in the database
 * @default 0
 *
 * @param Skill-D Event text
 * @desc Text to be displayed, while activating the move. %1 will be replaced by Skill name.
 * @default %1 is usable now!
 *
 * @param Skill-D Object text
 * @desc Text to be displayed, when player interacts with an HM applicable object. %1 will be replaced by Skill name.
 * @default Use %1 on this object
 *
 * @param Skill-E ID
 * @desc Insert Skill ID found in the database
 * @default 0
 *
 * @param Skill-E Event text
 * @desc Text to be displayed, while activating the move. %1 will be replaced by Skill name.
 * @default %1 is usable now!
 *
 * @param Skill-E Object text
 * @desc Text to be displayed, when player interacts with an HM applicable object. %1 will be replaced by Skill name.
 * @default Use %1 on this object
 *
 * @param Skill-F ID
 * @desc Insert Skill ID found in the database
 * @default 0
 *
 * @param Skill-F Event text
 * @desc Text to be displayed, while activating the move. %1 will be replaced by Skill name.
 * @default %1 is usable now!
 *
 * @param Skill-F Object text
 * @desc Text to be displayed, when player interacts with an HM applicable object. %1 will be replaced by Skill name.
 * @default Use %1 on this object
 *
 * @param Skill-G ID
 * @desc Insert Skill ID found in the database
 * @default 0
 *
 * @param Skill-G Event text
 * @desc Text to be displayed, while activating the move. %1 will be replaced by Skill name.
 * @default %1 is usable now!
 *
 * @param Skill-G Object text
 * @desc Text to be displayed, when player interacts with an HM applicable object. %1 will be replaced by Skill name.
 * @default Use %1 on this object
 *
 * @param Skill-H ID
 * @desc Insert Skill ID found in the database
 * @default 0
 *
 * @param Skill-H Event text
 * @desc Text to be displayed, while activating the move. %1 will be replaced by Skill name.
 * @default %1 is usable now!
 *
 * @param Skill-H Object text
 * @desc Text to be displayed, when player interacts with an HM applicable object. %1 will be replaced by Skill name.
 * @default Use %1 on this object
 *
 * @help
 *
 * - You can enter upto 8 skills to be used as HM.
 * - Enter the skill's ID and the text to be shown while activating the HM.
 * - Enter Plugin Command: HMObject <skill ID> on any event that needs to be affected by that skill.
 * - Call a Common Event in the required skill's trait.
 * - In that Common Event, enter Plugin Command HMEvent <skill ID>
 * - Whenever that skill is used outside battle, the event with HMObject Plugin Command will turn it's Self Switch C ON,
 * if the event is triggered.
 */

(function(){

	let parameters = PluginManager.parameters('Dpahoe_HiddenMoves');
	let skill_a_id = parameters['Skill-A ID'] || '0';
	let skill_b_id = parameters['Skill-B ID'] || '0';
	let skill_c_id = parameters['Skill-C ID'] || '0';
	let skill_d_id = parameters['Skill-D ID'] || '0';
	let skill_e_id = parameters['Skill-E ID'] || '0';
	let skill_f_id = parameters['Skill-F ID'] || '0';
	let skill_g_id = parameters['Skill-G ID'] || '0';
	let skill_h_id = parameters['Skill-H ID'] || '0';

	let hm_status_array = {};
	let skill_texts = {};
	let object_texts = {};

	skill_texts[skill_a_id] = parameters['Skill-A Event text'] || '%1 is usable now!';
	skill_texts[skill_b_id] = parameters['Skill-B Event text'] || '%1 is usable now!';
	skill_texts[skill_c_id] = parameters['Skill-C Event text'] || '%1 is usable now!';
	skill_texts[skill_d_id] = parameters['Skill-D Event text'] || '%1 is usable now!';
	skill_texts[skill_e_id] = parameters['Skill-E Event text'] || '%1 is usable now!';
	skill_texts[skill_f_id] = parameters['Skill-F Event text'] || '%1 is usable now!';
	skill_texts[skill_g_id] = parameters['Skill-G Event text'] || '%1 is usable now!';
	skill_texts[skill_h_id] = parameters['Skill-H Event text'] || '%1 is usable now!';

	object_texts[skill_a_id] = parameters['Skill-A Object text'] || 'Use %1 on this object';
	object_texts[skill_b_id] = parameters['Skill-B Object text'] || 'Use %1 on this object';
	object_texts[skill_c_id] = parameters['Skill-C Object text'] || 'Use %1 on this object';
	object_texts[skill_d_id] = parameters['Skill-D Object text'] || 'Use %1 on this object';
	object_texts[skill_e_id] = parameters['Skill-E Object text'] || 'Use %1 on this object';
	object_texts[skill_f_id] = parameters['Skill-F Object text'] || 'Use %1 on this object';
	object_texts[skill_g_id] = parameters['Skill-G Object text'] || 'Use %1 on this object';
	object_texts[skill_h_id] = parameters['Skill-H Object text'] || 'Use %1 on this object';

	var alias_Scene_Map_onMapLoaded = Scene_Map.prototype.onMapLoaded;
	Scene_Map.prototype.onMapLoaded = function() {

	    // Established map load routines.
	    alias_Scene_Map_onMapLoaded.call(this);

	    // Plugin addendum
		hm_status_array[skill_a_id] = false;
		hm_status_array[skill_b_id] = false;
		hm_status_array[skill_c_id] = false;
		hm_status_array[skill_d_id] = false;
		hm_status_array[skill_e_id] = false;
		hm_status_array[skill_f_id] = false;
		hm_status_array[skill_g_id] = false;
		hm_status_array[skill_h_id] = false;
	}

	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        // insert additional processing details here

        switch (command.toLowerCase()) {
    		case "hmevent":
    			let hmevent_skill_id = (args[0] || "").toLowerCase();
    			if(!$gameParty.inBattle()){
    				hm_status_array[hmevent_skill_id] = true;
    				$gameMessage.add(skill_texts[hmevent_skill_id].replace('%1', $dataSkills[parseInt(hmevent_skill_id)].name));
    			}
    		break;
    		case "hmobject":
    			let hmobject_skill_id = (args[0] || "").toLowerCase();
    			if(hm_status_array[hmobject_skill_id]){
	    			let map_id = $gameMap._mapId;
	    			let event_id = this._eventId;
					let key = [map_id, event_id, 'C'];
					$gameSelfSwitches.setValue(key, true);
    			}
    			else{
    				$gameMessage.add(object_texts[hmobject_skill_id].replace('%1', $dataSkills[parseInt(hmobject_skill_id)].name));
    			}
    		break;

    		default:
    		break;
    	}


    };
})();