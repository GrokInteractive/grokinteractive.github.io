(function($, undefined) {

$.widget("grok.savemenot", {

    _create: function() {

        this.inputs = this.element.find('input, textarea, select, button');

        this.submit = $('[type="submit"]');

        this._inputSetup();

        this.initialFormState = this._getInputValues();
    },

    _getInputValues: function() {

        var formValues = {};

        this.inputs.not("[type='checkbox']").each(function(index, element) {
            var $element = $(element);
            formValues[$element.attr('name')] = $element.val();
        });

        this.inputs.filter('[type="checkbox"]').each(function(index, element) {

            var $element = $(element);
            var checked = false;

            if ($element.prop('checked')) {
                checked = true;
            };

            formValues[$element.attr('name')] = checked;

        });

        return formValues;
    },

    _formChanged: function() {

        var object1 = this.initialFormState;
        var object2 = this._getInputValues();

        var isEqual = true;

        $.each(object2, function(name, value) {
            if (object1[name] !== object2[name] ) {
                isEqual = false;
                return isEqual;
            };
        });

        return !isEqual;
    },

    _inputSetup: function() {

        this.submit.attr('disabled', 'disabled');
        this._selectSetup(this.inputs.filter('select'));
        this._inputsOn();

    },

    _inputsOn: function() {

        var that = this;

        this.inputs.on('change keyup', function() {

            if (that._formChanged()) {
                that.submit.removeAttr('disabled', 'disabled');
            } else {
                that.submit.attr('disabled', 'disabled');
            }

        });
    },

    _selectSetup: function($selects) {

        $selects.each(function(index, element) {

            var $element = $(element);
            var value = $element.val();

            if (!value || /^\s*$/.test(value)) return;

            $element.prop('selectedIndex', -1);
        });
    }
});
})(jQuery);
