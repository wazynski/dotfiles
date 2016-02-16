# Path to your oh-my-zsh installation.
export ZSH=$HOME/.oh-my-zsh

# Theme
ZSH_THEME="doubleend-tsw"

# Plugins
plugins=(git jsontools rails ruby powder knife)

# User configuration
export PATH="/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin"
export PATH="$HOME/.node/bin:$PATH"

source $ZSH/oh-my-zsh.sh

eval "$(rbenv init -)"

alias be='bundle exec'
alias ls="ls -lah"
