function git_prompt_info() {
  ref=$(git symbolic-ref HEAD 2> /dev/null) || return
  echo "$(parse_git_dirty)$ZSH_THEME_GIT_PROMPT_PREFIX$(current_branch)$ZSH_THEME_GIT_PROMPT_SUFFIX"
}

function get_pwd() {
  print -D $PWD
}

function battery_charge() {
  if [ -e ~/.oh-my-zsh/batcharge.py ]
  then
    echo `python ~/.oh-my-zsh/batcharge.py`
  else
    echo ''
  fi
}

function put_spacing() {
  local git=$(git_prompt_info)
  if [ ${#git} != 0 ]; then
    ((git=${#git} - 10))
  else
    git=0
  fi

  local bat=$(battery_charge)
  if [ ${#bat} != 0 ]; then
    ((bat = ${#bat} - 1))
  else
    bat=0
  fi

  local termwidth

  (( termwidth = ${COLUMNS} - 3 - ${#HOST} - ${#$(get_pwd)} - ${bat} - ${git} ))

  local spacing=""
  for i in {1..$termwidth}; do
    spacing="${spacing} "
  done
  echo $spacing
}

function precmd() {
print -rP '
$fg[cyan]%n@%m: $fg[yellow]$(get_pwd)$(put_spacing)$(git_prompt_info) $fg[cyan][$(ruby_version)] $(battery_charge)'
}

function ruby_version()
{
    if which rvm-prompt &> /dev/null; then
      rvm-prompt i v g
    else
      if which rbenv &> /dev/null; then
        rbenv version | sed -e "s/ (set.*$//"
      fi
    fi
}

PROMPT='%{$reset_color%}→ '

ZSH_THEME_GIT_PROMPT_PREFIX="[git:"
ZSH_THEME_GIT_PROMPT_SUFFIX="]$reset_color"
ZSH_THEME_GIT_PROMPT_DIRTY="$fg[red]+"
ZSH_THEME_GIT_PROMPT_CLEAN="$fg[green]"