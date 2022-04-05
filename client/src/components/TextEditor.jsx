import React from 'react'
import { useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import BlotFormatter from 'quill-blot-formatter';
import 'quill/dist/quill.snow.css';
import '../styles.css';


function Editor () {
	
	const myToolbar = [
		['bold', 'italic', 'underline', 'strike'],
		[{ align: [] }],
	
		[{ list: 'ordered'}, { list: 'bullet' }],
		[{ indent: '-1'}, { indent: '+1' }],
	
		[{ size: ['small', false, 'large', 'huge'] }],
		[{ header: [1, 2, 3, 4, 5, 6, false] }],
		['link', 'image', 'video'],
		[{ color: [] }, { background: [] }],
	
		['clean'],
	];

	const formats = [
		'bold', 'italic', 'underline', 'strike',
		'align', 'list', 'indent',
		'size', 'header',
		'link', 'image', 'video',
		'color', 'background',
		'clean',
	];
	
	const { quill, quillRef, Quill } = useQuill({
		modules: {
			toolbar: myToolbar,
			clipboard: {
				matchVisual: false,
			},
		},
		formats: formats
	});

	if (Quill && !quill) {
		Quill.register(BlotFormatter);
	}

	const selectURLImage = () => {
		console.log("SELECTING!!!");
		console.log('quill', quill, '\nquillRef', quillRef, '\nQuill', Quill)
		const tooltip = quill.theme.tooltip;
		const originalSave = tooltip.save;
		const originalHide = tooltip.hide;

		tooltip.save = function () {
			const range = quill.getSelection(true);
			const value = tooltip.textbox.value;
			if (value) {
				quill.insertEmbed(range.index, 'image', value, 'user');
			}
		};
		// Called on hide and save.
		tooltip.hide = function () {
			tooltip.save = originalSave;
			tooltip.hide = originalHide;
			tooltip.hide();
		};
		tooltip.edit('image');
		tooltip.textbox.placeholder = 'Embed URL';

	};

	useEffect(() => {
		if (quill) {
			quill.getModule('toolbar').addHandler('image', selectURLImage);
			quill.on('text-change', (delta, oldContents) => {
				// console.log('Text change!');
				// console.log(delta);

				let currrentContents = quill.getContents();
				// console.log(currrentContents.diff(oldContents));
			});
		}
	}, [quill, Quill]);

	return (
		<div>
		<div ref={quillRef} />
		</div>
	);
};

export default Editor;
