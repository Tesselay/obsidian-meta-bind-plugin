<script lang="ts">
	import { ButtonStyleType, InsertIntoNoteButtonAction } from 'packages/core/src/config/ButtonConfig';
	import Button from 'packages/core/src/utils/components/Button.svelte';
	import SettingComponent from 'packages/core/src/utils/components/SettingComponent.svelte';
	import { IPlugin } from 'packages/core/src/IPlugin';

	export let action: InsertIntoNoteButtonAction;
	export let plugin: IPlugin;
</script>

<SettingComponent name="Line" description="The line number to insert at.">
	<input type="number" bind:value={action.line} placeholder="0" />
</SettingComponent>

<SettingComponent name="Text to Insert" description="The text to insert into the note."></SettingComponent>
<div class="meta-bind-full-width meta-bind-high">
	<textarea bind:value={action.value}></textarea>
</div>
